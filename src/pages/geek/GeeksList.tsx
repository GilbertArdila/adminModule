import {
  IonButton,
  IonCard,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory } from "react-router";
import { add, pencil, trash } from "ionicons/icons";
import { useEffect, useState } from "react";


import { deleteGeek, getGeekList } from "../../api/geekApi";
import Geek from "../../schemas/geek";

const GeeksList: React.FC = () => {
  const [geeks, setGeeks] = useState<Geek[]>([]);
  const [seachByName, setseachByName] = useState("");

  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = async () => {
    const geeks = await getGeekList();
    setGeeks(geeks);
  };
  const removeGeek = (id: string) => {
    deleteGeek(id);
    getGeekList();
  };

  const addGeek = () => {
    history.push("/page/Geek/new");
  };
  const editGeek = (id: string) => {
    history.push("/page/Geek/" + id);
  };

  const busqueda = (e: any) => {
    setseachByName(e.target.value);
  };
  let geeksFiltrados = !seachByName
    ? geeks
    : geeks.filter(
        (geek) =>
          geek.name &&
          geek.name.toLowerCase().includes(seachByName.toLowerCase())
      );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large" style={{ textAlign: "center" }}>
            The Geek store
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <IonTitle>Geeks</IonTitle>

          <IonItem>
            <IonButton
              color={"primary"}
              fill="outline"
              slot="end"
              size="default"
              onClick={addGeek}
            >
              <IonIcon icon={add} />
              Add Geek
            </IonButton>
          </IonItem>

          <IonItem>
            <input
              placeholder="Buscar por nombre"
              name="term"
              type="text"
              style={{ border: "black", borderRadius: "5px", width: "60%" }}
              onChange={busqueda}
            />
          </IonItem>

          <IonGrid className="table" style={{ width: "100%" }}>
            <IonRow>
              <IonCol style={{ width: "1/10" }}>nombre</IonCol>
              <IonCol style={{ width: "2/10" }}>url</IonCol>
              <IonCol style={{ width: "1/10" }}>precio</IonCol>
              <IonCol style={{ width: "1/10" }}>cantidad</IonCol>
              <IonCol style={{ width: "1/10" }}>categoria</IonCol>
              <IonCol style={{ width: "2/10" }}>descripcion</IonCol>
              <IonCol style={{ width: "2/10" }}>acción</IonCol>
            </IonRow>

            {geeksFiltrados.map((geek: Geek) => (
              <IonRow key={geek.id}>
                <IonCol>{geek.name}</IonCol>
                <IonCol>{geek.url}</IonCol>
                <IonCol>{geek.price}</IonCol>
                <IonCol>{geek.quantity}</IonCol>
                <IonCol>{geek.category?.name}</IonCol>
                <IonCol>{geek.description}</IonCol>
                <IonCol>
                  <IonButton
                    color={"warning"}
                    fill="clear"
                    onClick={() => {
                      editGeek(String(geek.id));
                    }}
                  >
                    <IonIcon icon={pencil} slot="icon-only" />
                  </IonButton>
                  <IonButton
                    color={"danger"}
                    fill="clear"
                    onClick={() => removeGeek(String(geek.id))}
                  >
                    <IonIcon icon={trash} slot="icon-only" />
                  </IonButton>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default GeeksList;
