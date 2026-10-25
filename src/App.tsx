import React, { useState, useEffect } from 'react';
import { Draft, BusinessCategory, AppSettings, ContentTemplate } from './types';
import {
  getAllDrafts,
  saveDraft,
  deleteDraft as deleteDraftDb,
  getSettings,
  saveSettings,
  exportDataJSON,
  INITIAL_CATEGORIES,
} from './services/db';
import { Header } from './components/Header';
import { MobileNavigation } from './components/MobileNavigation';
import { DraftsList } from './components/DraftsList';
import { DraftEditor } from './components/DraftEditor';
import { CategoriesView } from './components/CategoriesView';
import { BackupModal } from './components/BackupModal';
import { SettingsModal } from './components/SettingsModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<'drafts' | 'editor' | 'categories' | 'backup'>('drafts');
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<Draft | null>(null);
  const [settings, setSettings] = useState<AppSettings>({
    defaultBusinessName: 'استودیو توانا',
    defaultCategory: 'ecommerce',
    defaultTone: 'حرفه‌ای و متقاعدکننده',
    autoSave: true,
    geminiApiKey: '',
  });
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load database content on boot
  const refreshData = async () => {
    setIsLoading(true);
    try {
      const loadedDrafts = await getAllDrafts();
      const loadedSettings = await getSettings();
      setDrafts(loadedDrafts);
      setSettings(loadedSettings);
    } catch (err) {
      console.error('Failed to load storage data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCreateNewDraft = () => {
    setSelectedDraft(null);
    setActiveTab('editor');
  };

  const handleSelectDraftToEdit = (draft: Draft) => {
    setSelectedDraft(draft);
    setActiveTab('editor');
  };

  const handleSaveDraft = async (draftToSave: Draft) => {
    const saved = await saveDraft(draftToSave);
    setSelectedDraft(saved);
    await refreshData();
  };

  const handleDeleteDraft = async (id: string) => {
    await deleteDraftDb(id);
    if (selectedDraft?.id === id) {
      setSelectedDraft(null);
    }
    await refreshData();
  };

  const handleToggleFavorite = async (draft: Draft) => {
    const updated = { ...draft, isFavorite: !draft.isFavorite };
    await saveDraft(updated);
    await refreshData();
  };

  const handleSelectCategoryTemplate = (template: ContentTemplate) => {
    const newDraftFromTemp: Draft = {
      id: `draft-temp-${Date.now()}`,
      title: template.titleFa,
      businessName: settings.defaultBusinessName || 'استودیو توانا',
      categoryId: template.categoryId,
      contentType: template.contentType,
      tone: template.defaultTone,
      targetAudience: 'مخاطبان هدف کسب‌وکار',
      content: '',
      keywords: ['تولید محتوا', 'استودیو توانا'],
      notes: template.descriptionFa,
      status: 'draft',
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setSelectedDraft(newDraftFromTemp);
    setActiveTab('editor');
  };

  const handleExportJSON = async () => {
    const jsonStr = await exportDataJSON();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `tavana_studio_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveSettings = async (newSettings: AppSettings) => {
    const saved = await saveSettings(newSettings);
    setSettings(saved);
  };

  return (
    <div className="min-h-screen bg-[#F7F1E8] text-[#573921] pb-20 md:pb-12 dir-rtl">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewDraftClick={handleCreateNewDraft}
        onOpenSettings={() => setIsSettingsOpen(true)}
        draftsCount={drafts.length}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <div className="w-10 h-10 border-3 border-[#A96F38] border-t-transparent rounded-full animate-spin" />
            <p className="text-xs font-semibold text-[#77716B]">در حال بارگذاری اطلاعات استودیو...</p>
          </div>
        ) : (
          <>
            {activeTab === 'drafts' && (
              <DraftsList
                drafts={drafts}
                categories={INITIAL_CATEGORIES}
                onSelectDraft={handleSelectDraftToEdit}
                onDeleteDraft={handleDeleteDraft}
                onToggleFavorite={handleToggleFavorite}
                onNewDraftClick={handleCreateNewDraft}
                onExportJSON={handleExportJSON}
              />
            )}

            {activeTab === 'editor' && (
              <DraftEditor
                draft={selectedDraft}
                categories={INITIAL_CATEGORIES}
                onSave={handleSaveDraft}
                onDelete={handleDeleteDraft}
                onBack={() => setActiveTab('drafts')}
              />
            )}

            {activeTab === 'categories' && (
              <CategoriesView
                categories={INITIAL_CATEGORIES}
                onSelectTemplate={handleSelectCategoryTemplate}
              />
            )}

            {activeTab === 'backup' && <BackupModal onRefresh={refreshData} />}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        draftsCount={drafts.length}
      />

      {/* Settings Modal */}
      {isSettingsOpen && (
        <SettingsModal
          settings={settings}
          onSaveSettings={handleSaveSettings}
          onClose={() => setIsSettingsOpen(false)}
          draftsCount={drafts.length}
        />
      )}
    </div>
  );
}
