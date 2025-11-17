
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Device } from '../../models/device.model';
import { DeviceCardComponent } from '../device-card/device-card.component';

@Component({
  selector: 'app-device-grid',
  templateUrl: './device-grid.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, DeviceCardComponent],
})
export class DeviceGridComponent {
  devices = input.required<Device[]>();
  selectedDeviceId = input<string | null | undefined>();
  deviceSelected = output<Device>();

  onSelectDevice(device: Device): void {
    this.deviceSelected.emit(device);
  }
}
