
import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Device } from '../../models/device.model';

@Component({
  selector: 'app-device-card',
  templateUrl: './device-card.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  host: {
    '[class.border-cyan-400]': 'isSelected()',
    '[class.border-transparent]': '!isSelected()',
    'class': 'border-2 rounded-lg transition-all duration-200'
  }
})
export class DeviceCardComponent {
  device = input.required<Device>();
  isSelected = input<boolean>(false);

  statusInfo = computed(() => {
    const device = this.device();
    switch (device.status) {
      case 'on':
        return { text: 'Activo', color: 'bg-green-500' };
      case 'off':
        return { text: 'Apagado', color: 'bg-red-500' };
      case 'standby':
        return { text: 'En espera', color: 'bg-yellow-500' };
      default:
        return { text: 'Desconocido', color: 'bg-slate-500' };
    }
  });

  statusColorClass(): string {
    return this.statusInfo().color;
  }

  statusText(): string {
    return this.statusInfo().text;
  }
}
