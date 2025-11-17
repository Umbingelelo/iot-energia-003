
import { Injectable, signal } from '@angular/core';
import { Device } from '../models/device.model';

@Injectable({
  providedIn: 'root',
})
export class IotDataService {
  devices = signal<Device[]>(this.generateMockData());

  private generateMockData(): Device[] {
    return [
      {
        deviceId: "f47ac10b-58cc-4372-a567-0e02b2c3d479",
        deviceName: "Refrigerador",
        status: "on",
        currentWattage: 150.7,
        todayKWh: 1.35,
        hourlyHistoryKWh: [0.1, 0.1, 0.12, 0.1, 0.08, 0.1, 0.11, 0.12, 0.1, 0.09, 0.1, 0.1, 0.12, 0.1, 0.05, 0.1, 0.1, 0.12, 0.1, 0.05, 0.1, 0.1, 0.12, 0.1],
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15M12 8.25v7.5" />`
      },
      {
        deviceId: "e2e3f4c1-5a0d-4f1e-8a0a-1b2c3d4e5f6a",
        deviceName: "TV Living",
        status: "standby",
        currentWattage: 5.2,
        todayKWh: 0.45,
        hourlyHistoryKWh: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.15, 0.12, 0.08, 0.0, 0.0, 0.0],
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-1.621-.87a3 3 0 0 1-.879-2.122v-1.007m-9 0a9 9 0 0 1 18 0" />
               <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
               <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />`
      },
      {
        deviceId: "a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6",
        deviceName: "Aire Acondicionado",
        status: "off",
        currentWattage: 0.8,
        todayKWh: 3.2,
        hourlyHistoryKWh: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.8, 1.2, 1.0, 0.2, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0],
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
               <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />`
      },
      {
        deviceId: "b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7",
        deviceName: "Microondas",
        status: "off",
        currentWattage: 0.5,
        todayKWh: 0.15,
        hourlyHistoryKWh: [0, 0, 0, 0, 0, 0, 0, 0.05, 0, 0, 0, 0, 0.08, 0, 0, 0, 0, 0, 0, 0.02, 0, 0, 0, 0],
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />`
      },
      {
        deviceId: "c3d4e5f6-a7b8-c9d0-e1f2-a3b4c5d6e7f8",
        deviceName: "Lavadora",
        status: "on",
        currentWattage: 1200,
        todayKWh: 1.8,
        hourlyHistoryKWh: [0, 0, 0, 0, 0, 0, 0, 0, 1.5, 0.3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />`
      },
      {
        deviceId: "d4e5f6a7-b8c9-d0e1-f2a3-b4c5d6e7f8g9",
        deviceName: "Luces Cocina",
        status: "on",
        currentWattage: 45.3,
        todayKWh: 0.5,
        hourlyHistoryKWh: [0, 0, 0, 0, 0, 0.05, 0.05, 0.05, 0.05, 0, 0, 0, 0, 0, 0, 0, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0, 0],
        icon: `<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.354a15.056 15.056 0 0 1-4.5 0m3.75 2.354a18.061 18.061 0 0 1-4.5 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 4.5h.008v.008H12v-.008Z" />`
      }
    ];
  }
}
