
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DeviceGridComponent } from './components/device-grid/device-grid.component';
import { HourlyChartComponent } from './components/hourly-chart/hourly-chart.component';
import { IotDataService } from './services/data.service';
import { Device } from './models/device.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    NavbarComponent,
    DeviceGridComponent,
    HourlyChartComponent,
  ],
})
export class AppComponent {
  iotDataService = new IotDataService();
  allDevices = this.iotDataService.devices;
  selectedDevice = signal<Device | null>(this.allDevices()[0] ?? null);

  handleDeviceSelection(device: Device): void {
    this.selectedDevice.set(device);
  }
}
