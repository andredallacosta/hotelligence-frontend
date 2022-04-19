import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, shallowEqual, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  FormControl,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
} from "@material-ui/core/";
import { AddCircleOutline, Edit, Delete } from "@material-ui/icons";

import { ButtonLoading, Modal } from "@Components/UI";
import { RoomTypeForm } from "@Components/forms";
import api from "@Utils/api";
import { failure } from "Redux@Helpers";
import useStyles from "./styles";

export default function RoomForm(props) {
  const { room, onSuccess, onFail } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);
  const [roomTypeForm, setRoomTypeForm] = useState(false);
  const [roomTypeToEdit, setRoomTypeToEdit] = useState(null);

  const { hotel } = useSelector((state) => state.platform.hotel, shallowEqual);

  const { handleSubmit, errors, control, getValues, setValue } = useForm({
    defaultValues: {
      ...room,
      type: room.type?.id || "",
    },
  });

  const saveRoom = (formData) => {
    setLoading(true);
    const obj = {
      ...room,
      ...formData,
      hotel: hotel?.id,
      value: parseFloat(formData.value),
    };
    if (room?.id) {
      api.room
        .update(obj)
        .then((response) => {
          setLoading(false);
          onSuccess(response.data);
        })
        .catch((error) => {
          setLoading(false);
          onFail(error);
          dispatch(
            failure("", "error", {
              title: "Erro",
              msg: "Não foi possível editar o quarto",
            })
          );
        });
    } else {
      api.room
        .create(obj)
        .then((response) => {
          setLoading(false);
          onSuccess(response.data);
        })
        .catch((error) => {
          setLoading(false);
          onFail(error);
          dispatch(
            failure("", "error", {
              title: "Erro",
              msg: "Não foi possível criar o quarto",
            })
          );
        });
    }
  };

  const getRoomTypes = () => {
    setLoading(true);
    api.roomType
      .list()
      .then((response) => {
        setLoading(false);
        setRoomTypes(response.data);
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          failure("", "error", {
            title: "Erro",
            msg: "Não foi possível obter os tipos de quarto",
          })
        );
      });
  };

  const deleteRoomType = () => {
    setLoading(true);
    api.roomType
      .delete(getValues()?.type)
      .then(() => {
        getRoomTypes();
        setValue("type", "");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        dispatch(
          failure("", "error", {
            title: "Erro",
            msg: "Não foi possível excluir o tipo de quarto",
          })
        );
      });
  };

  useEffect(() => {
    getRoomTypes();
  }, []);

  return (
    <form onSubmit={handleSubmit(saveRoom)} noValidate>
      <Grid container justifyContent="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Controller
            rules={{ required: "Este campo é obrigatório" }}
            as={
              <TextField variant="outlined" label="Número" required fullWidth />
            }
            error={!!errors.number}
            helperText={errors.number?.message || false}
            control={control}
            disabled={loading}
            name="number"
            type="number"
            onWheel={(e) => e.target.blur()}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            rules={{
              required: "Este campo é obrigatório",
            }}
            as={
              <TextField
                variant="outlined"
                label="Valor"
                required
                fullWidth
                InputProps={{
                  startAdornment: "R$",
                }}
              />
            }
            error={!!errors.value}
            helperText={errors.value?.message || false}
            control={control}
            disabled={loading}
            name="value"
            type="number"
          />
        </Grid>
        <Grid item xs={8} lg={9} xl={10}>
          <FormControl
            variant="outlined"
            required
            disabled={loading}
            error={!!errors.type}
            fullWidth
          >
            <InputLabel id="status">Tipo de Quarto</InputLabel>
            <Controller
              as={
                <Select
                  fullWidth
                  labelId="type"
                  error={!!errors.type}
                  label="Tipo de Quarto"
                  required
                >
                  {roomTypes.map((t) => (
                    <MenuItem key={`status-${t?.type}`} value={t?.id}>
                      {t?.type}
                    </MenuItem>
                  ))}
                </Select>
              }
              name="type"
              control={control}
              required
              rules={{
                required: "Este campo é obrigatório",
              }}
            />
            {errors.type ? (
              <FormHelperText error={!!errors.type}>
                {errors.type?.message || ""}
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>
        <Grid item xs={4} lg={3} xl={2} className={classes.buttonContainer}>
          <IconButton onClick={() => setRoomTypeForm(true)} size="small">
            <AddCircleOutline />
          </IconButton>
          <IconButton onClick={() => deleteRoomType()} size="small">
            <Delete />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              setRoomTypeToEdit(
                roomTypes.find((r) => getValues()?.type === r.id)
              );
              setRoomTypeForm(true);
            }}
          >
            <Edit />
          </IconButton>
        </Grid>
        <Grid item xs={12} className={classes.submitButtonGrid}>
          <ButtonLoading
            loading={loading}
            disabled={loading}
            color="primary"
            type="submit"
            className={classes.defaultButton}
          >
            Salvar
          </ButtonLoading>
        </Grid>
      </Grid>

      <Modal
        title={`${roomTypeToEdit ? "Editar" : "Adicionar"} Tipo de Quarto`}
        body={
          <RoomTypeForm
            roomType={roomTypeToEdit || {}}
            onSuccess={() => {
              setRoomTypeForm(false);
              getRoomTypes();
              if (roomTypeToEdit) {
                setRoomTypeToEdit(null);
              }
            }}
          />
        }
        open={roomTypeForm}
        onClose={() => {
          setRoomTypeForm(false);
          if (roomTypeToEdit) {
            setRoomTypeToEdit(null);
          }
        }}
        showAcceptButton={false}
        showCancelButton={false}
      />
    </form>
  );
}

RoomForm.propTypes = {
  room: PropTypes.object,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
};

RoomForm.defaultProps = {
  room: {},
  onSuccess: () => {},
  onFail: () => {},
};
