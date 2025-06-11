import React from 'react';

const timeOptions = Array.from({ length: 96 }, (_, i) => {
  const hours = String(Math.floor(i / 4)).padStart(2, '0');
  const minutes = String((i % 4) * 15).padStart(2, '0');
  return `${hours}:${minutes}:00`;
});

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const MenuSettingsPanel = ({
  selectedDays,
  toggleDay,
  startTime,
  endTime,
  handleStartTimeChange,
  handleEndTimeChange,
  timeError,
  description,
  setDescription,
  selectedMenu,
  updateMenu
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm pt-3 px-6 pb-6 mb-6">
      <h2 className="text-lg font-semibold mb-2">Menu Settings</h2>

      <div className="flex gap-2 mb-3">
        {WEEKDAYS.map((day) => (
          <button
            key={day}
            onClick={() => toggleDay(day)}
            className={`font-medium px-3 py-1 rounded transition ${
              selectedDays.includes(day)
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-pink-100 text-pink-600 hover:bg-pink-200'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="flex gap-4 mb-3">
        {/* Start Time */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Start Time</label>
          <select
            value={startTime}
            onChange={(e) => handleStartTimeChange(e.target.value)}
            className={`border ${timeError ? 'border-red-500' : 'border-gray-300'} rounded px-2 py-1 text-sm`}
          >
            {timeOptions.map((time) => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>

        {/* End Time */}
        <div className="flex items-end gap-2">
          <div>
            <label className="block text-sm text-gray-700 mb-1">End Time</label>
            <select
              value={endTime}
              onChange={(e) => handleEndTimeChange(e.target.value)}
              className={`border ${timeError ? 'border-red-500' : 'border-gray-300'} rounded px-2 py-1 text-sm`}
            >
              <option value="N/A">N/A</option>
              {timeOptions.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
          {timeError && (
            <span className="text-red-600 text-sm whitespace-nowrap">{timeError}</span>
          )}
        </div>
      </div>

      {/* Description */}
      <label className="block text-sm text-gray-700 mb-1">Description</label>
      <textarea
        value={description}
        onChange={(e) => {
          const val = e.target.value;
          if (val.length <= 500) {
            setDescription(val);
            updateMenu?.(selectedMenu.id, { description: val });
          }
        }}
        placeholder="Optional description..."
        className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <div className={`text-right text-xs mt-1 ${description.length > 450 ? 'text-red-500' : 'text-gray-500'}`}>
        {description.length} / 500
      </div>
    </div>
  );
};

export default MenuSettingsPanel;
