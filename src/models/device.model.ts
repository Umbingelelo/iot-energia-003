
export interface Device {
  deviceId: string;
  deviceName: string;
  status: 'on' | 'off' | 'standby';
  currentWattage: number;
  todayKWh: number;
  hourlyHistoryKWh: number[];
  icon: string; // SVG path for an icon
}
