import React, { useState } from 'react';
import { HelpCircle, Check, Info } from 'lucide-react';
import { useRefunds } from '../context/RefundContext';
import clsx from 'clsx';

const SectionHeader = ({ title, description }) => (
    <div className="mb-4">
        <h2 className="text-h3 mb-1 font-semibold">{title}</h2>
        {description && <p className="text-sm text-secondary">{description}</p>}
    </div>
);

const RadioCardItem = ({ value, selectedValue, onSelect, label, description, children }) => (
    <div
        onClick={() => onSelect(value)}
        className={clsx(
            "border rounded-xl p-4 mb-3 cursor-pointer transition-all relative overflow-hidden",
            selectedValue === value
                ? "border-primary bg-indigo-50/30 ring-1 ring-primary"
                : "border-gray-200 bg-white hover:border-gray-300"
        )}
    >
        <div className="flex items-start gap-3">
            <div className={clsx(
                "mt-0.5 w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors",
                selectedValue === value ? "border-primary bg-primary" : "border-gray-300 bg-white"
            )}>
                {selectedValue === value && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
            <div className="flex-1">
                <div className={clsx("font-medium text-base", selectedValue === value ? "text-primary" : "text-gray-900")}>
                    {label}
                </div>
                <div className="text-sm text-secondary mt-1 leading-relaxed">
                    {description}
                </div>
                {selectedValue === value && children && (
                    <div className="mt-4 pt-4 border-t border-indigo-100/50 animate-in fade-in slide-in-from-top-2 duration-200" onClick={e => e.stopPropagation()}>
                        {children}
                    </div>
                )}
            </div>
        </div>
    </div>
);

const CheckboxRow = ({ label, checked, onChange }) => (
    <label className={clsx(
        "flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer",
        checked ? "border-primary bg-indigo-50/30" : "border-gray-200 bg-white"
    )}>
        <div className={clsx(
            "w-5 h-5 rounded border flex items-center justify-center transition-colors",
            checked ? "bg-primary border-primary" : "bg-white border-gray-300"
        )}>
            {checked && <Check size={14} className="text-white" strokeWidth={3} />}
        </div>
        <input
            type="checkbox"
            className="hidden"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
        />
        <span className={clsx("text-sm font-medium", checked ? "text-primary" : "text-gray-700")}>{label}</span>
    </label>
);

const ToggleRow = ({ label, checked, onChange, helpText }) => (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
        <div>
            <div className="text-body font-medium">{label}</div>
            {helpText && <div className="text-xs text-secondary mt-1">{helpText}</div>}
        </div>
        <button
            onClick={() => onChange(!checked)}
            className={clsx(
                "w-12 h-6 rounded-full relative transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                checked ? "bg-primary" : "bg-gray-300"
            )}
        >
            <span
                className={clsx(
                    "translate-x-0 inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
                    checked ? "translate-x-6" : "translate-x-0.5"
                )}
            />
        </button>
    </div>
);

export default function ConfigurationPage() {
    const { settings, actions } = useRefunds();
    const [showToast, setShowToast] = useState(false);

    const toggleOrderState = (state) => {
        const current = settings.reviewTriggers.orderStates || [];
        if (current.includes(state)) {
            settings.setReviewTriggers({
                ...settings.reviewTriggers,
                orderStates: current.filter(s => s !== state)
            });
        } else {
            settings.setReviewTriggers({
                ...settings.reviewTriggers,
                orderStates: [...current, state]
            });
        }
    };

    const handleSave = () => {
        actions.saveSettings();
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return (
        <div className="p-4 relative min-h-full pb-10">

            {/* --- Section A: Refund Approval Control --- */}
            <section className="mb-8">
                <SectionHeader
                    title="Approval Control"
                    description="Decide when refunds are approved instantly."
                />

                <div className="mb-6">
                    <RadioCardItem
                        value="hybrid"
                        selectedValue={settings.approvalMode}
                        onSelect={settings.setApprovalMode}
                        label="Hybrid (Recommended)"
                        description="Auto-approve low-value refunds. Manually review high-value or risky ones."
                    >
                        <div className="bg-white/50 p-3 rounded-lg border border-indigo-100">
                            <label className="text-xs font-bold text-primary uppercase tracking-wider mb-2 block">Auto-Approve Up To</label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    step="50"
                                    value={settings.autoApprovalLimit}
                                    onChange={(e) => settings.setAutoApprovalLimit(Number(e.target.value))}
                                    className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <div className="font-bold text-lg text-primary w-16 text-right">₹{settings.autoApprovalLimit}</div>
                            </div>
                        </div>
                    </RadioCardItem>

                    <RadioCardItem
                        value="auto"
                        selectedValue={settings.approvalMode}
                        onSelect={settings.setApprovalMode}
                        label="Auto-Approve All"
                        description="All refunds are approved instantly. Fastest for customers, but highest risk."
                    >
                        <div className="bg-orange-50 p-2 rounded text-xs text-orange-800 flex gap-2">
                            <Info size={14} className="shrink-0 mt-0.5" />
                            Warning: You will not have a chance to review any refunds before money is sent.
                        </div>
                    </RadioCardItem>

                    <RadioCardItem
                        value="manual"
                        selectedValue={settings.approvalMode}
                        onSelect={settings.setApprovalMode}
                        label="Manual Review All"
                        description="You must personally approve every single refund request."
                    />
                </div>

                <div className="card">
                    <label className="text-sm font-semibold mb-3 block">Allowed Refund Types</label>
                    <div className="grid grid-cols-2 gap-3">
                        {['full', 'partial'].map(type => (
                            <CheckboxRow
                                key={type}
                                label={`${type.charAt(0).toUpperCase() + type.slice(1)} Refund`}
                                checked={settings.allowedTypes.includes(type)}
                                onChange={(checked) => {
                                    const newTypes = checked
                                        ? [...settings.allowedTypes, type]
                                        : settings.allowedTypes.filter(t => t !== type);
                                    if (newTypes.length > 0) settings.setAllowedTypes(newTypes);
                                }}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Section B: Manual Review Triggers --- */}
            <section className="mb-8">
                <SectionHeader
                    title="Review Triggers"
                    description="Force a manual review when these conditions are met."
                />

                <div className="card space-y-5">
                    {/* REMOVED: Redundant "Amount" trigger since Hybrid mode handles it */}

                    {/* Order State Triggers */}
                    <div>
                        <label className="text-sm font-semibold mb-3 block">Review refunds for orders in these states:</label>
                        <div className="grid grid-cols-1 gap-2">
                            {['Placed', 'Confirmed', 'In-Preparation', 'Completed', 'Cancelled'].map(state => {
                                const value = state.toLowerCase();
                                const isChecked = (settings.reviewTriggers.orderStates || []).includes(value);
                                return (
                                    <CheckboxRow
                                        key={state}
                                        label={state}
                                        checked={isChecked}
                                        onChange={() => toggleOrderState(value)}
                                    />
                                );
                            })}
                        </div>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                        <div className="flex justify-between items-center mb-2">
                            <label className="text-sm font-medium">Review Time Limit</label>
                            <select
                                value={settings.reviewTimeLimit}
                                onChange={(e) => settings.setReviewTimeLimit(Number(e.target.value))}
                                className="bg-gray-100 border-transparent rounded px-2 py-1 text-sm font-semibold"
                            >
                                <option value={15}>15 mins</option>
                                <option value={30}>30 mins</option>
                                <option value={60}>60 mins</option>
                            </select>
                        </div>
                        <div className="text-xs text-secondary leading-relaxed">
                            If you don't take action within <span className="font-bold text-gray-900">{settings.reviewTimeLimit} mins</span> of the refund being requested, it will automatically default to <strong>Platform Review</strong> to prevent bad customer experience.
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Section C: Notifications --- */}
            <section className="mb-8">
                <SectionHeader title="Notifications" />
                <div className="card">
                    <ToggleRow
                        label="In-App Notifications"
                        checked={settings.notifications.app}
                        onChange={(val) => settings.setNotifications({ ...settings.notifications, app: val })}
                    />
                    <ToggleRow
                        label="Email Alerts"
                        checked={settings.notifications.email}
                        onChange={(val) => settings.setNotifications({ ...settings.notifications, email: val })}
                    />
                </div>
            </section>

            <div className="mt-8 pt-6 pb-8 border-t border-gray-200">
                <button onClick={handleSave} className="btn mb-4 shadow-lg shadow-indigo-200 text-lg">
                    Save Configuration
                </button>
                <button onClick={actions.resetDefaults} className="btn btn-secondary w-full text-center">
                    Reset to Defaults
                </button>
            </div>

            {/* Toast */}
            <div className={clsx(
                "fixed top-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-6 py-3 rounded-full shadow-xl transition-all duration-300 z-[60] flex items-center gap-2",
                showToast ? "translate-y-0 opacity-100" : "-translate-y-10 opacity-0 pointer-events-none"
            )}>
                <Check size={18} className="text-green-400" />
                <span className="text-sm font-medium">Settings saved</span>
            </div>

        </div>
    );
}
