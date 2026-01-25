import { ShoppingCart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function EmptyCart() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center animate-in fade-in duration-500">
      <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
        <ShoppingCart className="h-12 w-12 text-muted-foreground" />
      </div>

      <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>

      <p className="text-muted-foreground mb-8 max-w-md">
        Looks like you haven't added anything to your cart yet. Start shopping to
        fill it up!
      </p>

      <Button asChild size="lg" className="group">
        <Link to="/">
          Continue Shopping
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </Button>
    </div>
  );
}

export default EmptyCart;
