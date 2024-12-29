import {useForm} from "@mantine/form";
import {TextInput, Button, Container, Loader} from "@mantine/core";
import {MantineFormDTO} from "@/service/userFormTypes";
import {registerUser} from "@/service/userFormService";
import {useState} from "react";
import {consoleLog} from "@/constants/costants";
import {validateForm} from "@/utils/validateFunction/validateFormOne";
import CardUser from "./modalUser";
import NotificationInfo from "./notification/Notification";
import ModalUser from "./modalUser";

//-----------------------------

type genericPropsMantine<T> = {
  labels: string[];
  placeholders: string[];
  buttonLabel: string;
  mode?: "uncontrolled" | "controlled";
};

//-----------------------------

function MantineForm<T extends MantineFormDTO>({
  labels,
  placeholders,
  buttonLabel,
  mode,
}: genericPropsMantine<T>) {
  const [openModal, setModalOpened] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<MantineFormDTO>();
  const [notification, setNotification] = useState(false);

  const form = useForm({
    mode: mode,
    initialValues: {name: "", email: "", age: 18},
    validate: validateForm,
  });

  async function handleSubmit(values: MantineFormDTO) {
    setLoading(true);
    try {
      const response = await registerUser(values);
      setUserData({
        name: response.name,
        email: response.email,
        age: response.age,
      });
      setModalOpened(true);
      form.reset();
    } catch (error) {
      console.error(consoleLog.error, error);
    } finally {
      setLoading(false);
      console.info(userData);
      setNotification(true);
    }
  }

  function disableButton(): boolean {
    return !form.values.name || !form.values.email || !form.values.age;
  }

  //-----------------------------

  return (
    <Container>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        {labels.map((label, _value) => (
          <div key={_value} style={{marginBottom: "1rem"}}>
            <TextInput
              label={label}
              placeholder={placeholders[_value]}
              {...form.getInputProps(label.toLowerCase())}
            />
          </div>
        ))}
        <Button type="submit" mt="lg" disabled={disableButton()}>
          {buttonLabel}
          {loading && <Loader color="lime" />}
        </Button>
      </form>
      <ModalUser
        name={userData?.name!}
        email={userData?.email!}
        age={userData?.age!}
        onClose={() => setModalOpened(false)}
        opened={openModal}
      ></ModalUser>
      {/* <NotificationInfo
        color={"green"}
        radius={"10"}
        title={"success"}
        message={"all done!"}
        onClose={() => setModalOpened(false)}
      ></NotificationInfo> */}
    </Container>
  );
}

export default MantineForm;
