import { RoomPreset, PlacedRoomItem } from '../types';

export const ROOM_PRESETS: RoomPreset[] = [
  {
    id: 'living-standard',
    name: 'Living Room Sanctuary (5m x 4m)',
    type: 'living',
    dimensionsMeter: { width: 5, length: 4 },
    gridSize: { cols: 10, rows: 8 }
  },
  {
    id: 'bedroom-suite',
    name: 'Master Bedroom Suite (5m x 5m)',
    type: 'bedroom',
    dimensionsMeter: { width: 5, length: 5 },
    gridSize: { cols: 10, rows: 10 }
  },
  {
    id: 'dining-hall',
    name: 'Grand Dining Space (4m x 4m)',
    type: 'dining',
    dimensionsMeter: { width: 4, length: 4 },
    gridSize: { cols: 8, rows: 8 }
  }
];

export const INITIAL_ROOM_LAYOUTS: Record<string, PlacedRoomItem[]> = {
  'living-standard': [
    {
      id: 'placed-1',
      productId: 'ochre-signature-sectional',
      x: 2,
      y: 2,
      rotation: 0,
      woodFinishId: 'w-raw-teak',
      fabricId: 'f-ochre-velvet'
    },
    {
      id: 'placed-2',
      productId: 'kanso-lounge-chair',
      x: 7,
      y: 3,
      rotation: 270,
      woodFinishId: 'w-raw-teak',
      fabricId: 'f-boucle-ivory'
    },
    {
      id: 'placed-3',
      productId: 'artisan-woolen-tufted-rug',
      x: 2,
      y: 1,
      rotation: 0
    },
    {
      id: 'placed-4',
      productId: 'alabaster-ceramic-table-lamp',
      x: 1,
      y: 1,
      rotation: 0
    }
  ]
};
