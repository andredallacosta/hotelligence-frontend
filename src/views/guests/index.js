/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Container } from "@material-ui/core";
import MaterialTable from "material-table";
import { Layout, Modal } from "@Components/UI";
import { GuestForm } from "@Components/forms";
import { failure } from "Redux@Helpers";
import api from "@Utils/api";
import { TableContainer, TableToolbar } from "./components";

import useStyles from "./styles";

export default function Guests() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [guestOnFocus, setGuestOnFocus] = useState(null);
  const [guestForm, setGuestForm] = useState(false);

  const tableColumns = [
    {
      title: "Nome",
      field: "full_name",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Telefone",
      render: (rowData) =>
        rowData.phone ? `(${rowData.phone.ddd}) ${rowData.phone.number}` : "-",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "CPF",
      field: "cpf",
      render: (rowData) => rowData.cpf || "-",
    },
    {
      title: "RG",
      field: "rg",
      render: (rowData) => rowData.rg || "-",
    },
    {
      title: "E-mail",
      field: "email",
      render: (rowData) => rowData.email || "-",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
  ];

  const getGuests = () => {
    setLoading(true);
    api.guest
      .list()
      .then((response) => {
        setGuests(response.data.sort((a, b) => a.full_name - b.full_name));
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        failure("", "error", {
          title: "Erro",
          msg: "Não foi possível obter os clientes",
        });
      });
  };

  const deleteGuest = (id) => {
    setLoading(true);
    api.guest
      .delete(id)
      .then(() => {
        setLoading(false);
        getGuests();
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          failure("", "error", {
            title: "Erro",
            msg: "Não foi possível excluir o cliente",
          })
        );
      });
  };

  useEffect(() => {
    getGuests();
  }, []);

  return (
    <Layout>
      <Container className={classes.container}>
        <MaterialTable
          columns={tableColumns}
          data={guests}
          title=""
          isLoading={loading}
          components={{
            Container: (p) => <TableContainer {...p} />,
            Toolbar: (p) => (
              <TableToolbar
                {...p}
                includeGuestButtonClick={() => setGuestForm(true)}
              />
            ),
          }}
          actions={[
            {
              icon: "visibility",
              tooltip: "Visualizar informações do cliente",
              onClick: (event, rowData) => {
                event.stopPropagation();
                history.push({
                  pathname: `/clientes/${rowData.id}`,
                });
              },
            },
            {
              icon: "edit",
              tooltip: "Editar cliente",
              onClick: (event, rowData) => {
                event.stopPropagation();
                setGuestOnFocus(rowData);
                setGuestForm(true);
              },
            },
            {
              icon: "delete",
              tooltip: "Deletar cliente",
              onClick: (event, rowData) => deleteGuest(rowData.id),
            },
          ]}
          localization={{
            pagination: {
              labelDisplayedRows: "{from}-{to} de {count}",
              labelRowsSelect: "linhas",
              firstAriaLabel: "Primeira Página",
              firstTooltip: "Primeira Página",
              previousAriaLabel: "Página Anterior",
              previousTooltip: "Página Anterior",
              nextAriaLabel: "Próxima Página",
              nextTooltip: "Próxima Página",
              lastAriaLabel: "Última Página",
              lastTooltip: "Última Página",
            },
            toolbar: {
              searchPlaceholder: "Buscar",
              searchTooltip: "Buscar",
            },
            body: {
              emptyDataSourceMessage:
                "Não foi possível carregar os clientes, atualize a página",
            },
            header: {
              actions: "Ações",
            },
          }}
          options={{
            draggable: false,
            search: true,
            toolbar: true,
            sorting: true,
            paging: true,
            actionsColumnIndex: -1,
            searchFieldAlignment: "left",
            emptyRowsWhenPaging: false,
            rowStyle: (rowData) => {
              // Apply striped style on rows
              const backgroundColor =
                rowData.tableData.id % 2 === 0 ? "#F9F9F9" : "#FFFFFF";
              return {
                backgroundColor,
              };
            },
          }}
        />
      </Container>

      <Modal
        title={`${guestOnFocus ? "Editar Quarto" : "Adicionar Quarto"}`}
        body={
          <GuestForm
            guest={guestOnFocus || {}}
            onSuccess={() => {
              setGuestOnFocus(null);
              setGuestForm(false);
              getGuests();
            }}
          />
        }
        width="50%"
        open={guestForm}
        onClose={() => {
          setGuestOnFocus(null);
          setGuestForm(false);
        }}
        showAcceptButton={false}
        showCancelButton={false}
      />
    </Layout>
  );
}
