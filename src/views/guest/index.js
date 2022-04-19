import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  Grid,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";

import { Button, Layout, Modal } from "@Components/UI";
import { GuestForm } from "@Components/forms";
import api from "@Utils/api";
import { failure } from "Redux@Helpers";
import useStyles from "./styles";

export default function Guest() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { id: guestId } = useParams();

  const [guest, setGuest] = useState({});
  const [loading, setLoading] = useState(true);
  const [guestModal, setGuestModal] = useState(false);

  const getGuest = () => {
    setLoading(true);
    api.guest
      .retrieve(guestId)
      .then((response) => {
        setGuest(response.data);
        setLoading(false);
      })
      .catch(() => {
        dispatch(
          failure("", "error", {
            title: "Erro",
            msg: "Não foi possível obter o hóspede",
          })
        );
      });
  };

  const deleteGuest = () => {
    setLoading(true);
    api.guest
      .delete(guest.id)
      .then(() => {
        setLoading(false);
        history.push("/clientes");
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          failure("", "error", {
            title: "Erro",
            msg: "Não foi possível deletar o hóspede",
          })
        );
      });
  };

  useEffect(() => {
    getGuest();
  }, []);

  return (
    <Layout>
      <Button
        startIcon={<ArrowBackIos />}
        label="Voltar"
        onClick={() => history.push("/clientes")}
        className={classes.backButton}
      />
      <Container className={classes.container}>
        {loading ? (
          <div className={classes.loading}>
            <CircularProgress size={100} />
          </div>
        ) : (
          <Grid container spacing={2} className={classes.infoContainer}>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.text}>
                Nome: {guest.full_name || "-"}
              </Typography>
              <Typography className={classes.text}>
                CPF: {guest.cpf || "-"}
              </Typography>
              <Typography className={classes.text}>
                RG: {guest.rg || "-"}
              </Typography>
              <Typography className={classes.text}>
                E-mail: {guest.email || "-"}
              </Typography>
              <Typography className={classes.text}>
                Telefone:{" "}
                {guest.phone
                  ? `(${guest.phone.ddd}) ${guest.phone.number}`
                  : "-"}
              </Typography>
              <div className={classes.buttonsDiv}>
                <Button
                  label="Excluir Hóspede"
                  onClick={() => deleteGuest()}
                  className={classes.button}
                />
                <Button
                  label="Editar Hóspede"
                  onClick={() => setGuestModal(true)}
                  className={classes.button}
                />
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography className={classes.text}>
                Endereço: {guest.address?.address1 || "-"}
              </Typography>
              <Typography className={classes.text}>
                Número: {guest.address?.number || "-" || "-"}
              </Typography>
              <Typography className={classes.text}>
                Complemento: {guest.address?.address2 || "-" || "-"}
              </Typography>
              <Typography className={classes.text}>
                Bairro: {guest.address?.district || "-" || "-"}
              </Typography>
              <Typography className={classes.text}>
                Cidade: {guest.address?.city || "-" || "-"}
              </Typography>
              <Typography className={classes.text}>
                Estado: {guest.address?.state || "-" || "-"}
              </Typography>
              <Typography className={classes.text}>
                CEP: {guest.address?.cep || "-" || "-"}
              </Typography>
              <Typography className={classes.text}>
                País: {guest.address?.country || "-" || "-"}
              </Typography>
            </Grid>
          </Grid>
        )}
      </Container>
      <Modal
        title="Editar Hóspede"
        body={
          <GuestForm
            guest={guest}
            onSuccess={() => {
              setGuestModal(false);
              getGuest();
            }}
          />
        }
        width="40%"
        open={guestModal}
        onClose={() => {
          setGuestModal(false);
        }}
        showAcceptButton={false}
        showCancelButton={false}
      />
    </Layout>
  );
}
