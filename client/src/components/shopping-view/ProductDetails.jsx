import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "../ui/use-toast";
import { setProductDetails } from "@/store/shop/products-slice";

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

  const handleAddToCart = (getCurrentProductId) => {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  };

  const handleDialogClose = () => {
    setOpen(false);
    dispatch(setProductDetails());
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogContent
        className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]"
        aria-describedby={undefined}
      >
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>
        <div className="">
          <div>
            <DialogTitle className="text-3xl font-bold">
              {productDetails?.title}
            </DialogTitle>
            <p className="text-muted-foreground text-2xl mb-5 mt-2">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="size-5 fill-primary" />
              <StarIcon className="size-5 fill-primary" />
              <StarIcon className="size-5 fill-primary" />
              <StarIcon className="size-5 fill-primary" />
              <StarIcon className="size-5 fill-primary" />
            </div>
            <span className="text-muted-foreground">(4.5)</span>
          </div>
          <div className="my-5">
            <Button
              onClick={() => handleAddToCart(productDetails?._id)}
              className="w-full"
            >
              Add to cart
            </Button>
          </div>
          <Separator />
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="grid gap-6">
              <div className="flex gap-4">
                <Avatar className="size-10 border">
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Enzo Fernadez</h3>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                    <StarIcon className="size-5 fill-primary" />
                  </div>
                  <p className="text-muted-foreground">
                    This is an awesome product
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Input
                placeholder="Write a review..."
                className="focus-visible:ring-transparent"
              />
              <Button>Submit</Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
