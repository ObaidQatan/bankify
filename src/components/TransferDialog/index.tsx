import { Select, Input } from "@mantine/core";
import { Customer } from "@prisma/client";
import { camelCase, startCase } from "lodash";
import useTranslation from "next-translate/useTranslation";
import { ChangeEvent, useState } from "react";
import RegularButton from "../common/Buttons/Regular";
import Dialog from "../common/Dialog";

const TransferDialog = ({
  customers,
  closer,
  emit,
  open,
}: {
  customers?: Customer[];
  closer: any;
  emit: any;
  open: boolean;
}) => {
  const { t: tCommon } = useTranslation("common");
  const [sender, setSender] = useState<Customer | undefined>();
  const [amount, setAmount] = useState<number>(0);

  if (!customers || !open) return null;
  return (
    <div className="fixed top-0 right-0 w-screen h-screen flex justify-center items-center bg-[#00000020]">
      <Dialog
        closer={closer}
        className="p-5 flex flex-col items-center justify-start"
      >
        {/** Name: {name}, email,  Account No. : {accountNumber}, balance: {balance} */}

        <Select
          className="w-full"
          placeholder={startCase(tCommon(camelCase("select sender")))}
          data={customers.map((customer) => ({
            label: customer?.name || "",
            value: customer?.id,
          }))}
          onChange={(value) => {
            setSender(customers.find((customer) => customer.id === value));
          }}
        />

        {sender && (
          <Input
            className="border-t border-[#00000020] w-full mt-5"
            type={"number"}
            placeholder={startCase(tCommon(camelCase("amount to send")))}
            onChange={(v: ChangeEvent<HTMLInputElement>) =>
              setAmount(parseFloat(v.currentTarget.value || "0"))
            }
          />
        )}

        {sender && amount > 0 && (
          <RegularButton
            className="mt-10"
            onClick={() => {
              emit({ sender, amount });
            }}
          >
            {startCase(tCommon(camelCase("proceed")))}
          </RegularButton>
        )}
      </Dialog>
    </div>
  );
};

export default TransferDialog;
