import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Label } from "../ui/label";

const AddressCard = ({
  addressInfo,
  handleDeleteAddress,
  handleEditAddress,
  setCurrentSelectedAddress,
  addressSelectedId,
}) => {
  return (
    <Card
      onClick={
        setCurrentSelectedAddress
          ? () => setCurrentSelectedAddress(addressInfo)
          : null
      }
      className={`cursor-pointer ${
        addressSelectedId?._id === addressInfo?._id
          ? "border-red-900 border-[2px]"
          : ""
      }`}
    >
      <CardContent
        className={`grid p-4 gap-4 ${
          addressSelectedId === addressInfo?._id ? "border-black" : ""
        }`}
      >
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pin Code: {addressInfo?.pinCode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button
          onClick={() => handleDeleteAddress(addressInfo)}
          variant="outline"
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AddressCard;
