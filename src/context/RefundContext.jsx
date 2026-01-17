import React, { createContext, useContext, useState } from 'react';

const RefundContext = createContext();

export const useRefunds = () => useContext(RefundContext);

export const RefundProvider = ({ children }) => {
    // --- Section A: Refund Approval Control ---
    const [approvalMode, setApprovalMode] = useState('hybrid'); // 'auto' | 'manual' | 'hybrid'
    const [autoApprovalLimit, setAutoApprovalLimit] = useState(200);
    const [allowedTypes, setAllowedTypes] = useState(['full']); // ['full', 'partial']

    // --- Section B: Manual Review Triggers ---
    const [reviewTriggers, setReviewTriggers] = useState({
        amount: true,
        orderStates: ['completed', 'cancelled'], // replaced 'completed' boolean with specific states
    });
    const [highValueThreshold, setHighValueThreshold] = useState(500);
    const [reviewTimeLimit, setReviewTimeLimit] = useState(30); // minutes
    const [expirationAction, setExpirationAction] = useState('platform'); // 'platform' | 'auto'

    // --- Section C: Notifications ---
    const [notifications, setNotifications] = useState({
        app: true,
        email: false,
    });
    const [notifyTriggers, setNotifyTriggers] = useState({
        reviewNeeded: true,
        expiring: true,
    });
    const [reminderTime, setReminderTime] = useState(5); // minutes

    // --- Actions ---
    const saveSettings = () => {
        // In a real app, API call here
        console.log("Settings saved:", { approvalMode, autoApprovalLimit, /*...*/ });
        return true; // success
    };

    const resetDefaults = () => {
        setApprovalMode('hybrid');
        setAutoApprovalLimit(200);
        setAllowedTypes(['full']);
        setReviewTriggers({ amount: true, orderStates: ['completed', 'cancelled'] });
        setHighValueThreshold(500);
        setReviewTimeLimit(30);
        setExpirationAction('platform');
        setNotifications({ app: true, email: false });
        setNotifyTriggers({ reviewNeeded: true, expiring: true });
        setReminderTime(5);
    };

    // --- Mock Data & User ---
    const [currentUser] = useState({
        name: 'Simran (Manager)',
        initials: 'SM',
        role: 'Manager'
    });

    const [refunds, setRefunds] = useState([
        { id: 'R101', orderId: '#9281', amount: 150, status: 'approved', time: '8 mins ago', type: 'auto', items: ['Chicken Tikka Masala x1'], customer: 'Rahul K.' },
        { id: 'R102', orderId: '#9279', amount: 650, status: 'review', time: '25 mins ago', type: 'manual', items: ['Family Feast Combo'], customer: 'Priya S.' },
        { id: 'R103', orderId: '#9201', amount: 120, status: 'completed', time: '2 hours ago', type: 'auto', items: ['Garlic Naan x2'], customer: 'Amit B.' },
        { id: 'R104', orderId: '#9155', amount: 450, status: 'review', time: 'Yesterday', type: 'manual', items: ['Paneer Butter Masala', 'Jeera Rice'], customer: 'John D.' },
    ]);

    const processRefund = (id, action) => {
        setRefunds(prev => prev.map(r => {
            if (r.id === id) {
                return {
                    ...r,
                    status: action === 'approve' ? 'approved' : 'rejected', // simplified status
                    resolvedBy: currentUser,
                    resolvedAt: 'Just now'
                };
            }
            return r;
        }));
    };

    const value = {
        settings: {
            approvalMode, setApprovalMode,
            autoApprovalLimit, setAutoApprovalLimit,
            allowedTypes, setAllowedTypes,
            reviewTriggers, setReviewTriggers,
            highValueThreshold, setHighValueThreshold,
            reviewTimeLimit, setReviewTimeLimit,
            expirationAction, setExpirationAction,
            notifications, setNotifications,
            notifyTriggers, setNotifyTriggers,
            reminderTime, setReminderTime
        },
        actions: { saveSettings, resetDefaults, processRefund },
        data: { refunds, currentUser }
    };

    return (
        <RefundContext.Provider value={value}>
            {children}
        </RefundContext.Provider>
    );
};
