import { SimpleGrid } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { Customer } from "@prisma/client";
import { camelCase, startCase } from "lodash";
import type { NextPage } from "next";
import useTranslation from "next-translate/useTranslation";
import { useEffect } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import RegularButton from "../../src/components/common/Buttons/Regular";
import Card from "../../src/components/common/Card";
import { loadingState } from "../../src/components/common/Loading";
import SelectedCustomer from "../../src/components/Customer";
import Header from "../../src/components/Layout/Header";
import Logo from "../../src/components/Layout/Logo";
import TransferDialog from "../../src/components/TransferDialog";

const Home: NextPage = () => {
  const { t: tCommon } = useTranslation("common");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [selectedCustomer, setSelectedCustomer] = useState<
    Customer | undefined
  >();
  const [transferDialog, setTransferDialog] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/customers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setLoading(false);

          return showNotification({
            title: "Error",
            message: "Error fetching customers",
            color: "red",
          });
        }

        res.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            setLoading(false);

            return showNotification({
              title: "Error",
              message:
                typeof data.error === "string"
                  ? data.error
                  : data.error.message,
              color: "red",
            });
          } else {
            showNotification({
              title: "Success",
              message: "Customers fetched successfully",
              color: "green",
            });

            setLoading(false);
            console.log({ customers: data.customers });
            return setCustomers(data.customers);
          }
        });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        return showNotification({
          title: "Error",
          message: typeof e === "string" ? e : e.message,
          color: "red",
        });
      });
  };

  const transferMoney = (
    senderId: string,
    receiverId: string,
    amount: number
  ) => {
    console.log({
      senderId,
      receiverId,
      amount,
    });

    setLoading(true);

    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL as string}/api/transfer/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId,
          receiverId,
          amount,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          setLoading(false);

          return showNotification({
            title: "Error",
            message: "Error making the transfer",
            color: "red",
          });
        }

        res.json().then((data) => {
          if (data.error) {
            console.log(data.error);
            setLoading(false);

            return showNotification({
              title: "Error",
              message:
                typeof data.error === "string"
                  ? data.error
                  : data.error.message,
              color: "red",
            });
          } else {
            showNotification({
              title: "Success",
              message: "Transfer done successfully",
              color: "green",
            });

            setLoading(false);
            setTransferDialog(false);
            setSelectedCustomer(undefined);
            fetchCustomers();
            console.log({ transfer: data.transfer });
            return;
          }
        });
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
        return showNotification({
          title: "Error",
          message: typeof e === "string" ? e : e.messagee,
          color: "red",
        });
      });
  };

  return (
    <Card className="rounded-none border-none shadow-none h-screen flex flex-col justify-start items-center">
      <Header />

      <SelectedCustomer
        customer={selectedCustomer}
        closer={() => {
          setSelectedCustomer(undefined);
        }}
        emit={() => {
          setTransferDialog(true);
        }}
      />

      <TransferDialog
        emit={(ob: { sender: Customer; amount: number } | undefined) => {
          ob && transferMoney(ob.sender.id, selectedCustomer?.id!, ob.amount);
        }}
        customers={
          customers
            ? customers?.filter((c) => c.id !== selectedCustomer?.id)
            : []
        }
        open={transferDialog}
        closer={() => {
          setTransferDialog(false);
        }}
      />

      {!customers || customers.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Logo size={300} />
          <h1 className="text-2xl font-bold font-[Monteserrat]">
            {startCase(tCommon(camelCase("no customers yet")))} {":("}
          </h1>
        </div>
      ) : (
        <SimpleGrid
          cols={3}
          breakpoints={[
            { maxWidth: 600, cols: 1 },
            { maxWidth: 900, cols: 2 },
          ]}
          spacing={50}
          className="flex-1 p-5 w-full overflow-y-auto"
        >
          {customers.map((customer) => (
            <Card
              key={customer.id}
              className="customer flex flex-col items-center justify-center bg-[#504e74] p-5 hover:shadow-[#00000040] hover:-translate-y-2 border-2 border-transparent hover:border-[#7267f0]"
            >
              <h3 className="font-bold font-[Monteserrat] text-white bg-[#00000020] rounded-full p-2 my-5">
                {customer.name}
              </h3>
              <RegularButton
                onClick={() => {
                  setSelectedCustomer(customer);
                }}
              >
                {startCase(tCommon(camelCase("view customer")))}
              </RegularButton>
            </Card>
          ))}
        </SimpleGrid>
      )}
    </Card>
  );
};

export default Home;
