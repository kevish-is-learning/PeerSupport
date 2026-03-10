"use client";

import { Settings as SettingsIcon, Shield, CreditCard, Database } from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Platform Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure platform settings and preferences
        </p>
      </div>

      {/* Settings Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition group cursor-pointer">
          <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center mb-4">
            <Shield size={24} className="text-primary" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-2">Security</h3>
          <p className="text-sm text-muted-foreground">
            Manage authentication, permissions, and security settings
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition group cursor-pointer">
          <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
            <CreditCard size={24} className="text-green-400" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-2">Payments</h3>
          <p className="text-sm text-muted-foreground">
            Manage payment gateway and transaction settings
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition group cursor-pointer">
          <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4">
            <Database size={24} className="text-yellow-400" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-2">Data & Backup</h3>
          <p className="text-sm text-muted-foreground">
            Database backups, exports, and data management
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition group cursor-pointer">
          <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
            <SettingsIcon size={24} className="text-purple-400" />
          </div>
          <h3 className="text-base font-semibold text-foreground mb-2">General</h3>
          <p className="text-sm text-muted-foreground">
            Platform name, logo, and general configurations
          </p>
        </div>
      </div>

      {/* Placeholder Info */}
      <div className="bg-card border border-border rounded-xl p-6">
        <p className="text-sm text-muted-foreground text-center">
          Detailed settings configuration coming soon...
        </p>
      </div>
    </div>
  );
}
