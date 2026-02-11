import React from 'react';
import { Scale, Droplet, Moon, Plus, Trash2, LineChart as LineChartIcon, BarChart3, AreaChart as AreaChartIcon } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

const DailyTrackingPage = ({
    activeTab,
    setActiveTab,
    trackingData,
    newWeight,
    setNewWeight,
    addWeightEntry,
    newWater,
    setNewWater,
    addWaterEntry,
    newSleep,
    setNewSleep,
    addSleepEntry,
    deleteEntry,
    setCurrentPage,
    t
}) => {
    const formatDateLabel = (value) => {
        const date = new Date(value);
        if (Number.isNaN(date.getTime())) return value;
        return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    };

    const formatRange = (entries) => {
        if (!entries.length) return null;
        const dates = entries.map((entry) => entry.date);
        const start = dates[0];
        const end = dates[dates.length - 1];
        return `${formatDateLabel(start)} - ${formatDateLabel(end)}`;
    };

    const weightChartData = trackingData.weight.map(e => ({ date: formatDateLabel(e.date), weight: e.value }));
    const waterChartData = trackingData.water.map(e => ({ date: formatDateLabel(e.date), liters: e.value }));
    const sleepChartData = trackingData.sleep.map(e => ({ date: formatDateLabel(e.date), hours: e.value }));

    return (
        <div className="pt-24 pb-16 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-black text-center mb-12 text-gray-900 dark:text-white tracking-tight">
                    {t.daily_tracking}
                </h1>

                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button
                        onClick={() => setActiveTab('weight')}
                        aria-label={t.weight}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'weight'
                            ? 'bg-linear-to-r from-emerald-500 to-teal-600 text-white shadow-lg'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
                            }`}
                    >
                        <Scale className="w-5 h-5 inline me-2" />
                        {t.weight}
                    </button>
                    <button
                        onClick={() => setActiveTab('water')}
                        aria-label={t.water_calc}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'water'
                            ? 'bg-linear-to-r from-blue-500 to-cyan-600 text-white shadow-lg'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
                            }`}
                    >
                        <Droplet className="w-5 h-5 inline me-2" />
                        {t.water_calc}
                    </button>
                    <button
                        onClick={() => setActiveTab('sleep')}
                        aria-label={t.sleep_calc}
                        className={`px-6 py-3 rounded-xl font-semibold transition-all ${activeTab === 'sleep'
                            ? 'bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-100 dark:border-gray-700'
                            }`}
                    >
                        <Moon className="w-5 h-5 inline me-2" />
                        {t.sleep_calc}
                    </button>
                </div>

                {activeTab === 'weight' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-50 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                                <Scale className="w-8 h-8 text-violet-600" />
                                {t.weight} {t.history}
                            </h2>

                            <div className="flex gap-4 mb-6">
                                <input
                                    type="number"
                                    value={newWeight}
                                    onChange={(e) => setNewWeight(e.target.value)}
                                    placeholder={`${t.weight} (${t.unit_kg})`}
                                    aria-label={`${t.weight} (${t.unit_kg})`}
                                    className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-violet-500 focus:outline-none transition-colors text-lg"
                                />
                                <button
                                    onClick={addWeightEntry}
                                    className="px-8 py-4 bg-linear-to-r from-violet-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <Plus className="w-5 h-5 inline me-2" />
                                    {t.add_entry}
                                </button>
                            </div>

                            {weightChartData.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{t.trend}</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <AreaChart data={weightChartData}>
                                            <defs>
                                                <linearGradient id="weightGradient" x1="0" y1="0" x2="0" y2="1">
                                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                                </linearGradient>
                                            </defs>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                                            <XAxis dataKey="date" stroke="#9ca3af" />
                                            <YAxis stroke="#9ca3af" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#1f2937',
                                                    border: '2px solid #8b5cf6',
                                                    borderRadius: '12px',
                                                    color: 'white'
                                                }}
                                            />
                                            <Area
                                                type="monotone"
                                                dataKey="weight"
                                                stroke="#8b5cf6"
                                                strokeWidth={3}
                                                fill="url(#weightGradient)"
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                        {t.tracking_range}: {formatRange(trackingData.weight)}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.history}</h3>
                                {trackingData.weight.length === 0 ? (
                                    <p className="text-gray-600 dark:text-gray-300 text-center py-8">{t.no_entries}</p>
                                ) : (
                                    <div className="space-y-2">
                                        {[...trackingData.weight].reverse().slice(0, 10).map((entry, index) => (
                                            <div key={entry.id ?? `${entry.date}-${entry.value}-${index}`} className="flex justify-between items-center p-4 bg-linear-to-r from-violet-50 to-purple-50 dark:from-violet-900/10 dark:to-purple-900/10 rounded-xl border border-violet-100 dark:border-violet-900/30">
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-white">{entry.value} {t.unit_kg}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{entry.date}</p>
                                                </div>
                                                <button
                                                    onClick={() => deleteEntry('weight', entry.id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors p-2"
                                                    aria-label={t.aria_delete_entry}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'water' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-50 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                                <Droplet className="w-8 h-8 text-blue-600" />
                                {t.water_calc} {t.history}
                            </h2>

                            <div className="flex gap-4 mb-6">
                                <input
                                    type="number"
                                    value={newWater}
                                    onChange={(e) => setNewWater(e.target.value)}
                                    placeholder={t.liters}
                                    aria-label={t.liters}
                                    className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-blue-500 focus:outline-none transition-colors text-lg"
                                />
                                <button
                                    onClick={addWaterEntry}
                                    className="px-8 py-4 bg-linear-to-r from-blue-500 to-cyan-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <Plus className="w-5 h-5 inline me-2" />
                                    {t.add_entry}
                                </button>
                            </div>

                            {waterChartData.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{t.trend}</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <BarChart data={waterChartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                                            <XAxis dataKey="date" stroke="#9ca3af" />
                                            <YAxis stroke="#9ca3af" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#1f2937',
                                                    border: '2px solid #3b82f6',
                                                    borderRadius: '12px',
                                                    color: 'white'
                                                }}
                                            />
                                            <Bar dataKey="liters" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                        {t.tracking_range}: {formatRange(trackingData.water)}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.history}</h3>
                                {trackingData.water.length === 0 ? (
                                    <p className="text-gray-600 dark:text-gray-300 text-center py-8">{t.no_entries}</p>
                                ) : (
                                    <div className="space-y-2">
                                        {[...trackingData.water].reverse().slice(0, 10).map((entry, index) => (
                                            <div key={entry.id ?? `${entry.date}-${entry.value}-${index}`} className="flex justify-between items-center p-4 bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-900/10 dark:to-cyan-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-white">{entry.value} {t.liters}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{entry.date}</p>
                                                </div>
                                                <button
                                                    onClick={() => deleteEntry('water', entry.id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors p-2"
                                                    aria-label={t.aria_delete_entry}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'sleep' && (
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-50 dark:border-gray-700">
                            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                                <Moon className="w-8 h-8 text-indigo-600" />
                                {t.sleep_calc} {t.history}
                            </h2>

                            <div className="flex gap-4 mb-6">
                                <input
                                    type="number"
                                    value={newSleep}
                                    onChange={(e) => setNewSleep(e.target.value)}
                                    placeholder={t.hours}
                                    aria-label={t.hours}
                                    className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:border-indigo-500 focus:outline-none transition-colors text-lg"
                                />
                                <button
                                    onClick={addSleepEntry}
                                    className="px-8 py-4 bg-linear-to-r from-indigo-500 to-purple-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                                >
                                    <Plus className="w-5 h-5 inline me-2" />
                                    {t.add_entry}
                                </button>
                            </div>

                            {sleepChartData.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">{t.trend}</h3>
                                    <ResponsiveContainer width="100%" height={300}>
                                        <LineChart data={sleepChartData}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" strokeOpacity={0.1} />
                                            <XAxis dataKey="date" stroke="#9ca3af" />
                                            <YAxis stroke="#9ca3af" />
                                            <Tooltip
                                                contentStyle={{
                                                    backgroundColor: '#1f2937',
                                                    border: '2px solid #6366f1',
                                                    borderRadius: '12px',
                                                    color: 'white'
                                                }}
                                            />
                                            <Line
                                                type="monotone"
                                                dataKey="hours"
                                                stroke="#6366f1"
                                                strokeWidth={3}
                                                dot={{ fill: '#6366f1', r: 6 }}
                                                activeDot={{ r: 8 }}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                    <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                        {t.tracking_range}: {formatRange(trackingData.sleep)}
                                    </p>
                                </div>
                            )}

                            <div className="space-y-3">
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t.history}</h3>
                                {trackingData.sleep.length === 0 ? (
                                    <p className="text-gray-600 dark:text-gray-300 text-center py-8">{t.no_entries}</p>
                                ) : (
                                    <div className="space-y-2">
                                        {[...trackingData.sleep].reverse().slice(0, 10).map((entry, index) => (
                                            <div key={entry.id ?? `${entry.date}-${entry.value}-${index}`} className="flex justify-between items-center p-4 bg-linear-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/10 dark:to-purple-900/10 rounded-xl border border-indigo-100 dark:border-indigo-900/30">
                                                <div>
                                                    <p className="font-semibold text-gray-800 dark:text-white">{entry.value} {t.hours}</p>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{entry.date}</p>
                                                </div>
                                                <button
                                                    onClick={() => deleteEntry('sleep', entry.id)}
                                                    className="text-red-600 hover:text-red-800 transition-colors p-2"
                                                    aria-label={t.aria_delete_entry}
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <button
                    onClick={() => setCurrentPage('home')}
                    className="mt-8 px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all border border-gray-100 dark:border-gray-700"
                >
                    {t.back_to_home}
                </button>
            </div>
        </div>
    );
};

export default DailyTrackingPage;
