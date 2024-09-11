import { Button } from "@/components/ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <Card className="flex flex-col items-center">
      <CardHeader>
        <CardTitle>Payment is successfully!</CardTitle>
      </CardHeader>
      <CardFooter>
        <Button onClick={() => navigate("/shop/account")}>View Orders</Button>
      </CardFooter>
    </Card>
  );
};

export default PaymentSuccessPage;
