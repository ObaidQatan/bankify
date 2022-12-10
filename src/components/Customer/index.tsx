import { SimpleGrid } from "@mantine/core/lib/SimpleGrid";
import { Customer } from "@prisma/client";
import { camelCase, startCase } from "lodash";
import useTranslation from "next-translate/useTranslation";
import RegularButton from "../common/Buttons/Regular";
import Card from "../common/Card";
import Dialog from "../common/Dialog";

const Customer = ({
  customer,
  closer,
  emit,
}: {
  customer?: Customer;
  closer: any;
  emit: any;
}) => {
  const { t: tCommon } = useTranslation("common");

  if (!customer) return null;
  return (
    <div className="fixed top-0 right-0 w-screen h-screen flex justify-center items-center bg-[#00000020]">
      <Dialog
        closer={closer}
        className="p-5 flex flex-col items-center justify-start"
      >
        {/** Name: {name}, email,  Account No. : {accountNumber}, balance: {balance} */}

        <div className="name flex justify-start items-center w-full">
          <div className="label bg-[#00000020] rounded-lg p-1 m-2 text-sm font-semibold">
            {startCase(tCommon(camelCase("name")))}:
          </div>
          <div className="value text-sm tracking-wider">{customer.name}</div>
        </div>
        <div className="email flex justify-start items-center w-full">
          <div className="label bg-[#00000020] rounded-lg p-1 m-2 text-sm font-semibold">
            {startCase(tCommon(camelCase("email")))}:
          </div>
          <div className="value text-sm tracking-wider">{customer.email}</div>
        </div>
        <div className="account-number flex justify-start items-center w-full">
          <div className="label bg-[#00000020] rounded-lg p-1 m-2 text-sm font-semibold">
            {startCase(tCommon(camelCase("account number")))}:
          </div>
          <div className="value text-sm tracking-wider">
            {customer.accountNumber}
          </div>
        </div>
        <div className="balance flex justify-start items-center w-full">
          <div className="label bg-[#00000020] rounded-lg p-1 m-2 text-sm font-semibold">
            {startCase(tCommon(camelCase("balance")))}:
          </div>
          <div className="value text-sm tracking-wider">{customer.balance}</div>
        </div>

        <RegularButton
          onClick={() => {
            emit();
          }}
        >
          {startCase(tCommon(camelCase("transfer money")))}
        </RegularButton>
      </Dialog>
    </div>
  );
};

export default Customer;
