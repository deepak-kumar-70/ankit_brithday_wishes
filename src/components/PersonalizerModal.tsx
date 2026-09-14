import React, { useState } from 'react';
import { PersonalConfig } from '../types';
import { X, Sparkles, Check, User, Heart, Home } from 'lucide-react';

interface PersonalizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: PersonalConfig;
  onSave: (newConfig: PersonalConfig) => void;
}

export const PersonalizerModal: React.FC<PersonalizerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSave,
}) => {
  const [formData, setFormData] = useState<PersonalConfig>(config);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-md bg-[#171b26] border border-white/15 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        {/* Glow ambient decoration */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-[#ff7597]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-[#edc157]/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-[#ff7597]/20 border border-[#ff7597]/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#ffb1c0]" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#dfe2f1]">
                Personalize Surprise
              </h3>
              <p className="text-xs text-[#ddbfc3]">
                Customize names and details for your roommate
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[#ddbfc3] hover:text-[#dfe2f1] hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
          <div>
            <label className="block text-xs font-semibold text-[#ffdf9b] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-[#edc157]" />
              Birthday Roommate's Name
            </label>
            <input
              type="text"
              required
              value={formData.roommateName}
              onChange={(e) => setFormData({ ...formData, roommateName: e.target.value })}
              placeholder="e.g. Alex, Sam, Vikram..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0f131d] border border-white/15 text-[#dfe2f1] placeholder:text-white/30 focus:outline-none focus:border-[#ff7597] focus:ring-1 focus:ring-[#ff7597] text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#ffdf9b] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-[#ff7597]" />
              Your Name (The Roommate)
            </label>
            <input
              type="text"
              required
              value={formData.yourName}
              onChange={(e) => setFormData({ ...formData, yourName: e.target.value })}
              placeholder="e.g. Dipak, Taylor..."
              className="w-full px-4 py-2.5 rounded-xl bg-[#0f131d] border border-white/15 text-[#dfe2f1] placeholder:text-white/30 focus:outline-none focus:border-[#ff7597] focus:ring-1 focus:ring-[#ff7597] text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#ddbfc3] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Home className="w-3.5 h-3.5 text-[#93c5fd]" />
                Room / Dorm
              </label>
              <input
                type="text"
                value={formData.dormNumber}
                onChange={(e) => setFormData({ ...formData, dormNumber: e.target.value })}
                placeholder="e.g. Room 304"
                className="w-full px-3 py-2 rounded-xl bg-[#0f131d] border border-white/15 text-[#dfe2f1] text-xs focus:outline-none focus:border-[#ff7597]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#ddbfc3] uppercase tracking-wider mb-1.5">
                Campus / Location
              </label>
              <input
                type="text"
                value={formData.collegeOrCity}
                onChange={(e) => setFormData({ ...formData, collegeOrCity: e.target.value })}
                placeholder="e.g. West Campus"
                className="w-full px-3 py-2 rounded-xl bg-[#0f131d] border border-white/15 text-[#dfe2f1] text-xs focus:outline-none focus:border-[#ff7597]"
              />
            </div>
          </div>

          {/* Preset quick picks */}
          <div className="pt-1">
            <span className="text-[11px] text-[#ddbfc3]">Quick presets:</span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {[
                { r: 'Alex', y: 'Dipak' },
                { r: 'Rahul', y: 'Aman' },
                { r: 'Sarah', y: 'Emma' },
                { r: 'Marcus', y: 'Leo' },
              ].map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setFormData({ ...formData, roommateName: preset.r, yourName: preset.y })}
                  className="px-2.5 py-1 rounded-lg bg-[#262a35] hover:bg-[#313540] text-[11px] text-[#dfe2f1] border border-white/10"
                >
                  {preset.r} & {preset.y}
                </button>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-3 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-[#ddbfc3] hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-[#ff7597] to-[#edc157] text-[#660029] font-bold text-xs flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(255,117,151,0.4)]"
            >
              <Check className="w-4 h-4 text-white" />
              <span className="text-white">Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
