import {
  IonButton,
  IonButtons,
  IonCard,
  IonCol,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import { backspaceOutline, saveOutline } from "ionicons/icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { saveGeek, searchGeekById, getCategoryList } from "../../api/geekApi";
import Geek from "../../schemas/geek";
import Category from "../../schemas/category";

const GeekEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [geek, setGeek] = useState<Geek>({});
  const [categories, setCategories] = useState<Category[]>([]);
  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  useEffect(() => {
    if (id !== "new") {
      search();
    }
    getCategories();
  }, [history.location.pathname]);

  const search = async () => {
    let geek = await searchGeekById(id);
    setGeek(geek);
  };

  const getCategories = async () => {
    let categories = await getCategoryList();
    setCategories(categories);
  };

  const save = () => {
    saveGeek(geek);
    history.push("/page/Geeks");
  };

  const onSubmit = () => {
    save();
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{id === "new" ? "Add new Geek" : "edit Geek"}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonCard>
          <form onSubmit={handleSubmit(onSubmit)}>
            <IonTitle>The Geek Store</IonTitle>
            <IonRow>


              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Nombre</IonLabel>
                  <IonInput
                    {...(id === "new"
                      ? {
                          ...register("nombre", {
                            required: true,
                            minLength: 3,
                            maxLength: 30,
                          }),
                        }
                      : { ...register("nombre") })}
                    aria-label="Nombre"
                    value={geek.name}
                    onIonChange={(e) => (geek.name = String(e.detail.value))}
                  ></IonInput>
                  {id === "new" && errors.nombre?.type === "required" && (
                    <p className="text-danger">El nombre es requerido</p>
                  )}
                  {id === "new" && errors.nombre?.type === "minlength" && (
                    <p className="text-danger">
                      El nombre debe tener al menos 3 caracteres
                    </p>
                  )}
                  {id === "new" && errors.nombre?.type === "maxlength" && (
                    <p className="text-danger">
                      El nombre debe tener menos de 30 caracteres
                    </p>
                  )}
                </IonItem>
              </IonCol>

              <IonCol>
                <IonList>
                  <IonItem>
                    <IonLabel position="floating">Categoria</IonLabel>
                    <IonSelect
                      {...(id === "new"
                        ? {
                            ...register("category", {
                              required: true,
                            }),
                          }
                        : { ...register("category") })}
                      aria-label="Seleccionar categoria"
                      value={geek.category}
                      onIonChange={(e) => {
                        geek.category = e.detail.value;
                      }}
                    >
                      {categories.map((category: Category) => (
                        <IonSelectOption key={category.id} value={category.id}>
                          {category.name}
                        </IonSelectOption>
                      ))}
                    </IonSelect>

                    {id === "new" && errors.category?.type === "required" && (
                      <p className="text-danger">La categoria es requerida</p>
                    )}
                  </IonItem>
                </IonList>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Descripción</IonLabel>
                  <IonInput
                    {...(id === "new"
                      ? {
                          ...register("descripcion", {
                            required: true,
                            minLength: 3,
                            maxLength: 30,
                          }),
                        }
                      : { ...register("dexdripcion") })}
                    type="text"
                    value={geek.description}
                    onIonChange={(e) =>
                      (geek.description = String(e.detail.value))
                    }
                  ></IonInput>
                  {id === "new" && errors.descripcion?.type === "required" && (
                    <p className="text-danger">La descripcion es requerida</p>
                  )}
                  {id === "new" && errors.descripcion?.type === "minLength" && (
                    <p className="text-danger">
                      La descripcion debe tener al menos 3caracteres
                    </p>
                  )}
                  {id === "new" && errors.descripcion?.type === "maxLength" && (
                    <p className="text-danger">
                      La descripcion debe tener maximo 30 caracteres
                    </p>
                  )}
                </IonItem>
              </IonCol>
            </IonRow>

            <IonRow>

              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Precio</IonLabel>
                  <IonInput
                    type="text"
                    {...(id === "new"
                      ? {
                          ...register("precio", {
                            required: true,
                          }),
                        }
                      : { ...register("precio") })}
                    value={geek.price}
                    onIonChange={(e) => (geek.price = Number(e.detail.value))}
                  ></IonInput>
                  {id === "new" && errors.precio?.type === "required" && (
                    <p className="text-danger">El precio es requerido</p>
                  )}
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Cantidad</IonLabel>
                  <IonInput
                    type="number"
                    {...(id === "new"
                      ? {
                          ...register("cantidad", {
                            required: true,
                            min: 1,
                          }),
                        }
                      : { ...register("cantidad") })}
                    value={geek.quantity}
                    onIonChange={(e) =>
                      (geek.quantity = Number(e.detail.value))
                    }
                  ></IonInput>
                  {id === "new" && errors.cantidad?.type === "required" && (
                    <p className="text-danger">La cantidad es requerida</p>
                  )}
                  {id === "new" && errors.cantidad?.type === "min" && (
                    <p className="text-danger">
                      La cantidad debe ser mayor a 0
                    </p>
                  )}
                </IonItem>
              </IonCol>

              <IonCol>
                <IonItem>
                  <IonLabel position="floating">URL</IonLabel>
                  <IonInput
                    {...(id === "new"
                      ? {
                          ...register("url", {
                            required: true,
                            pattern: /^(ftp|http|https):\/\/[^ "]+$/,
                          }),
                        }
                      : { ...register("url") })}
                    value={geek.url}
                    onIonChange={(e) => (geek.url = String(e.detail.value))}
                  ></IonInput>
                  {id === "new" && errors.url?.type === "required" && (
                    <p className="text-danger">La url es requerida</p>
                  )}
                  {id === "new" && errors.url?.type === "pattern" && (
                    <p className="text-danger">La url debe ser valida</p>
                  )}
                </IonItem>
              </IonCol>
            </IonRow>

            <IonItem>

              <IonButton
                type="button"
                color={"secondary"}
                fill="outline"
                slot="start"
                size="default"
                onClick={() => {
                  history.push("/page/geeks");
                }}
              >
                <IonIcon icon={backspaceOutline} /> Cancel
              </IonButton>

              <IonButton
                type="submit"
                color={"success"}
                fill="outline"
                slot="end"
                size="default"
              >
                <IonIcon icon={saveOutline} /> Save
              </IonButton>
              
            </IonItem>
          </form>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default GeekEdit;
