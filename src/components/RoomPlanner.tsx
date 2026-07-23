import React, { useState } from 'react';
import {
  Sparkles,
  RotateCw,
  Trash2,
  Plus,
  ShoppingBag,
  Ruler,
  Layers,
  Check,
  Maximize2,
  Info
} from 'lucide-react';
import { Product, PlacedRoomItem, RoomPreset } from '../types';
import { ROOM_PRESETS, INITIAL_ROOM_LAYOUTS } from '../data/roomPlanner';
import { PRODUCTS } from '../data/products';

interface RoomPlannerProps {
  onAddMultipleToCart: (items: { product: Product; woodFinishId?: string; fabricId?: string }[]) => void;
}

export const RoomPlanner: React.FC<RoomPlannerProps> = ({ onAddMultipleToCart }) => {
  const [selectedPreset, setSelectedPreset] = useState<RoomPreset>(ROOM_PRESETS[0]);
  const [placedItems, setPlacedItems] = useState<PlacedRoomItem[]>(
    INITIAL_ROOM_LAYOUTS['living-standard'] || []
  );
  const [selectedPlacedId, setSelectedPlacedId] = useState<string | null>(
    placedItems[0]?.id || null
  );
  const [addedSuccessMsg, setAddedSuccessMsg] = useState(false);

  // Get current active placed item object
  const activePlacedItem = placedItems.find((item) => item.id === selectedPlacedId);
  const activeProduct = activePlacedItem
    ? PRODUCTS.find((p) => p.id === activePlacedItem.productId)
    : null;

  // Calculate Total Cost of Staged Room
  const totalRoomCostINR = placedItems.reduce((sum, item) => {
    const prod = PRODUCTS.find((p) => p.id === item.productId);
    return sum + (prod ? prod.priceINR : 0);
  }, 0);

  const formatINR = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleAddItemToRoom = (product: Product) => {
    const newItem: PlacedRoomItem = {
      id: `placed-${Date.now()}`,
      productId: product.id,
      x: Math.floor(Math.random() * (selectedPreset.gridSize.cols - 2)) + 1,
      y: Math.floor(Math.random() * (selectedPreset.gridSize.rows - 2)) + 1,
      rotation: 0,
      woodFinishId: product.availableWoodFinishes[0]?.id,
      fabricId: product.availableFabrics[0]?.id,
    };
    setPlacedItems([...placedItems, newItem]);
    setSelectedPlacedId(newItem.id);
  };

  const handleRotateItem = (id: string) => {
    setPlacedItems(
      placedItems.map((item) => {
        if (item.id === id) {
          const nextRot = ((item.rotation + 90) % 360) as 0 | 90 | 180 | 270;
          return { ...item, rotation: nextRot };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: string) => {
    setPlacedItems(placedItems.filter((item) => item.id !== id));
    if (selectedPlacedId === id) {
      setSelectedPlacedId(null);
    }
  };

  const handleMoveItem = (id: string, deltaX: number, deltaY: number) => {
    setPlacedItems(
      placedItems.map((item) => {
        if (item.id === id) {
          const newX = Math.max(0, Math.min(selectedPreset.gridSize.cols - 1, item.x + deltaX));
          const newY = Math.max(0, Math.min(selectedPreset.gridSize.rows - 1, item.y + deltaY));
          return { ...item, x: newX, y: newY };
        }
        return item;
      })
    );
  };

  const handleAddEntireRoomToCart = () => {
    const itemsToAdd = placedItems
      .map((placed) => {
        const prod = PRODUCTS.find((p) => p.id === placed.productId);
        if (!prod) return null;
        return {
          product: prod,
          woodFinishId: placed.woodFinishId,
          fabricId: placed.fabricId,
        };
      })
      .filter((x): x is { product: Product; woodFinishId?: string; fabricId?: string } => x !== null);

    onAddMultipleToCart(itemsToAdd);
    setAddedSuccessMsg(true);
    setTimeout(() => setAddedSuccessMsg(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8" id="room-planner">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="font-serif-brand text-3xl sm:text-4xl font-medium text-[#2B2220]">
          3D Interactive Room Planner
        </h2>

        <p className="text-xs sm:text-sm text-[#6B5B54] leading-relaxed">
          Arrange furniture pieces to scale, test fabric finishes, check room clearance, and estimate total cost in INR before ordering.
        </p>
      </div>

      {/* Preset Room Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
        {ROOM_PRESETS.map((preset) => (
          <button
            key={preset.id}
            onClick={() => {
              setSelectedPreset(preset);
              setPlacedItems(INITIAL_ROOM_LAYOUTS[preset.id] || []);
            }}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all cursor-pointer ${
              selectedPreset.id === preset.id
                ? 'bg-[#2B2220] text-white shadow-md'
                : 'bg-white text-[#2B2220] border border-[#E6DDD0] hover:border-[#C17D3C]'
            }`}
          >
            {preset.name}
          </button>
        ))}
      </div>

      {/* Main Grid & Control Canvas Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white border border-[#E6DDD0] rounded-2xl p-4 sm:p-6 shadow-xl">
        {/* Left: Product Selector Library */}
        <div className="lg:col-span-3 border-r border-[#E6DDD0] pr-0 lg:pr-6 space-y-4">
          <div className="font-bold text-xs uppercase tracking-wider text-[#2B2220] flex items-center gap-2">
            <Layers size={16} className="text-[#C17D3C]" />
            <span>Furniture Library</span>
          </div>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
            {PRODUCTS.map((product) => (
              <div
                key={product.id}
                className="p-3 bg-[#FAF6F0] border border-[#E6DDD0] rounded-xl flex items-center justify-between gap-2 hover:border-[#C17D3C] transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-lg object-cover bg-white"
                  />
                  <div>
                    <h4 className="font-serif-brand font-medium text-xs text-[#2B2220] line-clamp-1">
                      {product.name}
                    </h4>
                    <p className="text-[11px] font-bold text-[#C17D3C]">
                      {formatINR(product.priceINR)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => handleAddItemToRoom(product)}
                  className="p-2 bg-[#2B2220] hover:bg-[#C17D3C] text-white rounded-lg transition-colors cursor-pointer"
                  title="Place in Room"
                >
                  <Plus size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Center: Interactive 2D Floor Plan Grid */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center p-4 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0] relative min-h-[420px]">
          {/* Room Dimensions Banner */}
          <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#E6DDD0] text-[11px] font-semibold text-[#2B2220] flex items-center gap-1.5">
            <Ruler size={14} className="text-[#C17D3C]" />
            <span>
              Canvas: {selectedPreset.dimensionsMeter.width}m x {selectedPreset.dimensionsMeter.length}m Scale
            </span>
          </div>

          {/* Grid Canvas */}
          <div
            className="w-full max-w-[460px] aspect-square bg-white border-2 border-dashed border-[#C17D3C]/40 rounded-xl relative shadow-inner p-2 grid gap-1"
            style={{
              gridTemplateColumns: `repeat(${selectedPreset.gridSize.cols}, 1fr)`,
              gridTemplateRows: `repeat(${selectedPreset.gridSize.rows}, 1fr)`,
            }}
          >
            {/* Render Placed Items */}
            {placedItems.map((item) => {
              const prod = PRODUCTS.find((p) => p.id === item.productId);
              if (!prod) return null;
              const isSelected = selectedPlacedId === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedPlacedId(item.id)}
                  style={{
                    gridColumnStart: item.x + 1,
                    gridColumnEnd: `span ${Math.min(3, selectedPreset.gridSize.cols - item.x)}`,
                    gridRowStart: item.y + 1,
                    gridRowEnd: `span ${Math.min(2, selectedPreset.gridSize.rows - item.y)}`,
                    transform: `rotate(${item.rotation}deg)`,
                  }}
                  className={`relative p-1.5 rounded-xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center bg-white shadow-sm hover:z-20 ${
                    isSelected
                      ? 'border-[#C17D3C] bg-[#C17D3C]/10 ring-2 ring-[#C17D3C]/30 z-10'
                      : 'border-[#E6DDD0] hover:border-[#2B2220]'
                  }`}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 object-cover rounded-md pointer-events-none"
                  />
                  <span className="text-[9px] font-bold text-[#2B2220] truncate w-full mt-0.5 pointer-events-none">
                    {prod.name.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Controls Bar for Active Item */}
          {activePlacedItem && activeProduct && (
            <div className="mt-4 p-3 bg-white rounded-xl border border-[#E6DDD0] w-full max-w-[460px] flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-[#2B2220]">{activeProduct.name}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {/* Movement buttons */}
                <button
                  onClick={() => handleMoveItem(activePlacedItem.id, -1, 0)}
                  className="px-2 py-1 bg-[#FAF6F0] rounded font-mono hover:bg-[#E6DDD0]"
                  title="Move Left"
                >
                  &larr;
                </button>
                <button
                  onClick={() => handleMoveItem(activePlacedItem.id, 1, 0)}
                  className="px-2 py-1 bg-[#FAF6F0] rounded font-mono hover:bg-[#E6DDD0]"
                  title="Move Right"
                >
                  &rarr;
                </button>
                <button
                  onClick={() => handleMoveItem(activePlacedItem.id, 0, -1)}
                  className="px-2 py-1 bg-[#FAF6F0] rounded font-mono hover:bg-[#E6DDD0]"
                  title="Move Up"
                >
                  &uarr;
                </button>
                <button
                  onClick={() => handleMoveItem(activePlacedItem.id, 0, 1)}
                  className="px-2 py-1 bg-[#FAF6F0] rounded font-mono hover:bg-[#E6DDD0]"
                  title="Move Down"
                >
                  &darr;
                </button>

                <button
                  onClick={() => handleRotateItem(activePlacedItem.id)}
                  className="p-1.5 bg-[#FAF6F0] hover:bg-[#C17D3C] hover:text-white rounded text-[#2B2220] transition-colors"
                  title="Rotate 90°"
                >
                  <RotateCw size={14} />
                </button>

                <button
                  onClick={() => handleRemoveItem(activePlacedItem.id)}
                  className="p-1.5 bg-rose-50 text-rose-700 hover:bg-rose-600 hover:text-white rounded transition-colors"
                  title="Remove Item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Room Summary & Order Entire Room */}
        <div className="lg:col-span-3 border-l border-[#E6DDD0] pl-0 lg:pl-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="font-serif-brand font-medium text-lg text-[#2B2220]">
              Staged Room Estimate
            </h3>

            <div className="p-4 bg-[#FAF6F0] rounded-xl border border-[#E6DDD0] space-y-2">
              <div className="flex justify-between text-xs text-[#6B5B54]">
                <span>Items placed in room:</span>
                <span className="font-bold text-[#2B2220]">{placedItems.length} pcs</span>
              </div>

              <div className="flex justify-between text-xs text-[#6B5B54]">
                <span>White Glove Installation:</span>
                <span className="font-bold text-emerald-700">INCLUDED FREE</span>
              </div>

              <div className="border-t border-[#E6DDD0] pt-2 flex justify-between items-end">
                <span className="text-xs font-bold uppercase text-[#2B2220]">Total Price:</span>
                <span className="text-xl font-bold text-[#C17D3C]">
                  {formatINR(totalRoomCostINR)}
                </span>
              </div>
            </div>

            {/* List of placed items */}
            <div className="space-y-2 max-h-[220px] overflow-y-auto">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B5B54]">
                Included Furniture Pieces:
              </span>
              {placedItems.map((item) => {
                const prod = PRODUCTS.find((p) => p.id === item.productId);
                if (!prod) return null;
                return (
                  <div
                    key={item.id}
                    className="text-xs p-2 bg-white rounded-lg border border-[#E6DDD0] flex items-center justify-between"
                  >
                    <span className="truncate max-w-[150px] font-medium text-[#2B2220]">
                      {prod.name}
                    </span>
                    <span className="font-bold text-[#C17D3C]">
                      {formatINR(prod.priceINR)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-4">
            {addedSuccessMsg && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs rounded-xl text-center font-bold flex items-center justify-center gap-1.5">
                <Check size={16} />
                <span>All {placedItems.length} pieces added to your shopping bag!</span>
              </div>
            )}

            <button
              onClick={handleAddEntireRoomToCart}
              disabled={placedItems.length === 0}
              className="w-full py-4 bg-[#2B2220] hover:bg-[#C17D3C] text-white rounded-xl text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              <ShoppingBag size={18} />
              <span>Add Entire Room to Bag ({formatINR(totalRoomCostINR)})</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
