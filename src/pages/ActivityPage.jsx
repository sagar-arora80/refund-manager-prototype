import React, { useState, useEffect } from 'react';
import { useRefunds } from '../context/RefundContext';
import { X, CheckCircle, Clock, AlertCircle, ChevronRight, User, ChevronDown, ChevronUp, AlertTriangle } from 'lucide-react';
import clsx from 'clsx';

// --- Sub-Components ---
const StatusBadge = ({ status }) => {
    const styles = {
        approved: "bg-green-100 text-green-700",
        review: "bg-yellow-100 text-yellow-800",
        rejected: "bg-red-100 text-red-700",
        completed: "bg-gray-100 text-gray-600"
    };
    const labels = {
        approved: "Approved",
        review: "Needs Review",
        rejected: "Rejected",
        completed: "Completed"
    }
    return (
        <span className={clsx("inline-flex items-center px-2 py-1 rounded text-xs font-semibold whitespace-nowrap", styles[status])}>
            {status === 'review' && <Clock size={12} className="mr-1" />}
            {status === 'approved' && <CheckCircle size={12} className="mr-1" />}
            {status === 'rejected' && <X size={12} className="mr-1" />}
            {labels[status]}
        </span>
    );
};

const CountdownTimer = ({ expiresAt }) => {
    const [timeLeft, setTimeLeft] = useState('');
    const [isUrgent, setIsUrgent] = useState(false);

    useEffect(() => {
        const calculateTime = () => {
            if (!expiresAt) return;
            const now = Date.now();
            const diff = expiresAt - now;

            if (diff <= 0) {
                setTimeLeft('Expired');
                setIsUrgent(false);
                return;
            }

            const mins = Math.floor((diff / 1000) / 60);
            const secs = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
            setIsUrgent(mins < 5); // Urgent if less than 5 mins
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [expiresAt]);

    if (!expiresAt) return null;

    return (
        <div className={clsx(
            "text-xs font-bold px-2 py-1 rounded flex items-center gap-1.5 transition-colors",
            isUrgent ? "bg-red-100 text-red-700 animate-pulse" : "bg-yellow-100 text-yellow-800"
        )}>
            <Clock size={12} />
            To Platform in {timeLeft}
        </div>
    );
};


const TimelineItem = ({ title, time, active, isLast, subtitle }) => (
    <div className="relative pb-6 pl-6 border-l-2 border-gray-100 last:border-0 last:pb-0">
        <div className={clsx(
            "absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 bg-white",
            active ? "border-primary" : "border-gray-300"
        )}>
            {active && <div className="absolute inset-0.5 bg-primary rounded-full" />}
        </div>
        <div className={clsx("text-sm font-medium", active ? "text-gray-900" : "text-gray-500")}>{title}</div>
        {subtitle && <div className="text-xs text-primary font-medium mt-0.5">{subtitle}</div>}
        <div className="text-xs text-secondary mt-0.5">{time}</div>
    </div>
);


const RefundDetailModal = ({ refund, onClose, onAction }) => {
    const [isOrderExpanded, setIsOrderExpanded] = useState(false);

    if (!refund) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-[2px] animate-in fade-in duration-200" onClick={onClose}>
            <div
                className="bg-white w-full max-w-[480px] rounded-t-2xl sm:rounded-2xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300 mx-auto max-h-[90vh] overflow-y-auto"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-h2 font-bold mb-1">
                            {refund.status === 'review' ? 'Refund Review' : 'Refund Details'}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-secondary">
                            <span>ID: {refund.id}</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300" />
                            <span>{refund.time}</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                        <X size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Main Stats with Timer */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-6">
                    <div>
                        <div className="text-xs text-secondary uppercase tracking-wider font-semibold mb-1">Refund Amount</div>
                        <div className="text-2xl font-bold text-gray-900">₹{refund.amount}</div>
                        {/* Refund Context Subtitle */}
                        <div className="text-xs text-gray-500 mt-1 font-medium">
                            (Includes {refund.items?.length || 1} items + Tax)
                        </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                        <div className="text-xs text-secondary uppercase tracking-wider font-semibold">Status</div>
                        {refund.status === 'review' ? (
                            <CountdownTimer expiresAt={refund.expiresAt} />
                        ) : (
                            <StatusBadge status={refund.status} />
                        )}
                    </div>
                </div>

                {/* Enhanced Accordion */}
                <div className={clsx(
                    "border rounded-xl overflow-hidden mb-6 transition-all",
                    isOrderExpanded ? "border-indigo-200 ring-2 ring-indigo-50" : "border-gray-200"
                )}>
                    <button
                        onClick={() => setIsOrderExpanded(!isOrderExpanded)}
                        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-indigo-50/50 transition-colors"
                    >
                        <div className="text-left flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0">
                                <span className="font-bold text-gray-600 text-xs">#{refund.orderId.replace('#', '')}</span>
                            </div>
                            <div>
                                <div className="font-semibold text-gray-900">Order Items</div>
                                <div className="text-xs text-secondary underline decoration-dotted">View details</div>
                            </div>
                        </div>
                        {isOrderExpanded ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-gray-400" />}
                    </button>

                    {isOrderExpanded && (
                        <div className="p-4 bg-white border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                            <div className="space-y-3">
                                {refund.items?.map((item, i) => (
                                    <div key={i} className="flex justify-between items-start text-sm">
                                        <div className="flex gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                                            <span className="text-gray-700 font-medium leading-relaxed">{item}</span>
                                        </div>
                                        <span className="text-gray-500 tabular-nums">x1</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center text-gray-500 text-xs">
                                <span>Customer: {refund.customer}</span>
                                <span>Total Value: ₹{refund.amount + 120}</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Timeline */}
                <div className="mb-8">
                    <div className="text-xs font-bold text-gray-900 mb-4 uppercase tracking-wider">Timeline</div>
                    <div className="border-l-2 border-gray-100 ml-2 space-y-0">
                        <TimelineItem title="Refund Requested" time={refund.time} active={true} />

                        {refund.status === 'review' && (
                            <TimelineItem title="Waiting for Review" time="Action required" active={false} />
                        )}

                        {refund.resolvedBy && (
                            <TimelineItem
                                title={refund.status === 'approved' ? 'Approved' : 'Rejected'}
                                subtitle={`by ${refund.resolvedBy.name}`}
                                time={refund.resolvedAt}
                                active={true}
                            />
                        )}
                    </div>
                </div>

                {/* Actions */}
                {refund.status === 'review' && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button
                            onClick={() => onAction('reject')}
                            className="bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 active:bg-red-200 w-full px-6 py-3 rounded-full font-bold transition active:scale-95 flex items-center justify-center cursor-pointer gap-2"
                        >
                            <X size={18} />
                            Reject
                        </button>
                        <button
                            onClick={() => onAction('approve')}
                            className="btn shadow-lg shadow-indigo-200 w-full text-lg justify-center gap-2"
                        >
                            <CheckCircle size={18} />
                            Approve
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// --- Main Page ---
export default function ActivityPage() {
    const { data, actions } = useRefunds();
    const [selectedRefund, setSelectedRefund] = useState(null);

    const pendingRefunds = data.refunds.filter(r => r.status === 'review');
    const pastRefunds = data.refunds.filter(r => r.status !== 'review');

    const handleAction = (action) => {
        if (selectedRefund) {
            actions.processRefund(selectedRefund.id, action);
            setSelectedRefund(null);
        }
    }

    return (
        <div className="p-4 relative min-h-full pb-24 space-y-8">

            {/* --- Requires Attention Section --- */}
            {pendingRefunds.length > 0 && (
                <section>
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-h3 text-gray-900 flex items-center gap-2">
                            Requires Attention
                            <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full font-bold">{pendingRefunds.length}</span>
                        </h2>
                    </div>
                    <div className="space-y-3">
                        {pendingRefunds.map(refund => (
                            <div
                                key={refund.id}
                                onClick={() => setSelectedRefund(refund)}
                                className="card border-l-4 border-l-yellow-400 active:scale-[0.98] cursor-pointer hover:shadow-md transition-all relative overflow-hidden"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <AlertCircle size={18} className="text-yellow-600" />
                                        <span className="font-bold text-gray-900">Order {refund.orderId}</span>
                                    </div>
                                    <span className="font-bold text-lg">₹{refund.amount}</span>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="text-sm text-secondary">
                                        Requested by <span className="text-gray-900 font-medium">{refund.customer}</span> • {refund.time}
                                    </div>
                                    {/* Timer Badge on Card */}
                                    <div className="flex items-center">
                                        <CountdownTimer expiresAt={refund.expiresAt} />
                                        <ChevronRight size={16} className="text-gray-300 ml-1" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* --- Past Activity Section --- */}
            <section>
                <h2 className="text-h3 text-gray-900 mb-3 text-secondary">Past Activity</h2>
                <div className="space-y-3">
                    {pastRefunds.map(refund => (
                        <div
                            key={refund.id}
                            onClick={() => setSelectedRefund(refund)}
                            className="card flex items-center justify-between active:scale-[0.98] cursor-pointer hover:bg-gray-50 transition-all opacity-90"
                        >
                            <div className="flex items-center gap-3">
                                <div className={clsx(
                                    "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                                    refund.status === 'approved' ? "bg-green-100 text-green-700" :
                                        refund.status === 'rejected' ? "bg-red-100 text-red-700" : "bg-gray-200 text-gray-500"
                                )}>
                                    {refund.status === 'approved' ? <CheckCircle size={20} /> :
                                        refund.status === 'rejected' ? <X size={20} /> : <CheckCircle size={20} />}
                                </div>
                                <div>
                                    <div className="font-semibold text-gray-900 text-sm">Order {refund.orderId}</div>
                                    <div className="text-xs text-secondary mt-0.5">{refund.items?.[0] || 'Order items'}</div>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-gray-900 text-sm mb-1">₹{refund.amount}</div>
                                <StatusBadge status={refund.status} />
                            </div>
                        </div>
                    ))}
                    {pastRefunds.length === 0 && (
                        <div className="text-center py-8 text-secondary italic">No past activity</div>
                    )}
                </div>
            </section>

            {/* Render Modal */}
            <RefundDetailModal
                refund={selectedRefund}
                onClose={() => setSelectedRefund(null)}
                onAction={handleAction}
            />
        </div>
    );
}
