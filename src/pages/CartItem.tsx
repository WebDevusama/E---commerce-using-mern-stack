import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CartItem as CartItemType, useCart } from "@/contexts/CartContext";

interface CartItemProps {
  item: CartItemType;
}

const CartItem = ({ item }: CartItemProps) => {
  const { removeFromCart, updateQuantity } = useCart();

  return (
    <div className="flex gap-4 py-6 border-b border-border last:border-b-0 animate-in fade-in slide-in-from-left-4 duration-300">
      {/* Product Image */}
      <div className="relative w-24 h-24 md:w-32 md:h-32 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 flex flex-col justify-between min-w-0">
        <div className="flex justify-between gap-4">
          <div className="min-w-0">
            <h3 className="font-medium text-foreground text-sm md:text-base truncate">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm mt-1">
              ${item.price.toFixed(2)} each
            </p>
          </div>
          <p className="font-semibold text-foreground whitespace-nowrap">
            ${(item.price * item.qty).toFixed(2)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 bg-secondary rounded-lg p-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md hover:bg-background"
              onClick={() => updateQuantity(item.id, item.qty - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center font-medium text-sm">
              {item.qty}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-md hover:bg-background"
              onClick={() => updateQuantity(item.id, item.qty + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            onClick={() => removeFromCart(item.id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
