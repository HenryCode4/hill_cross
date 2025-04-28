
import Header from "@/components/header";
import SmsNotificationTable from "./SmsNotificationTable";



const SmsNotificationPage = () => {
  
  return (
    <div className="flex h-full w-full flex-col gap-y-[24px] bg-[#F8F8F8] pb-[24px] pt-[90px] lg:gap-y-[43px] lg:px-[52px]">
      <Header
        backIcon
        title={"Sms Notification"}
        subTitle={"Accounting & Finance"}
      />

      <SmsNotificationTable />
    </div>
  );
};

export default SmsNotificationPage;
