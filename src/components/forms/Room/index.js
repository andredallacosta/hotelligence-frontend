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
} from "@material-ui/core/";

import { ButtonLoading } from "@Components/UI";
import api from "@Utils/api";
import { failure } from "Redux@Helpers";
import useStyles from "./styles";

export default function RoomForm(props) {
  const { room, onSuccess, onFail } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [roomTypes, setRoomTypes] = useState([]);

  const { hotel } = useSelector((state) => state.platform.hotel, shallowEqual);

  const { handleSubmit, errors, control } = useForm({
    defaultValues: {
      ...room,
      type: room.type?.id || "",
    },
  });

  const saveRoom = (formData) => {
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
              <TextField variant="outlined" label="Valor" required fullWidth />
            }
            error={!!errors.value}
            helperText={errors.value?.message || false}
            control={control}
            disabled={loading}
            name="value"
            type="number"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControl
            fullWidth
            variant="outlined"
            className={classes.formControl}
            required
            disabled={loading}
            error={!!errors.type}
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
