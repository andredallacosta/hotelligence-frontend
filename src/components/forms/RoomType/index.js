import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
  Grid,
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  FormHelperText,
} from "@material-ui/core/";

import { ButtonLoading } from "@Components/UI";
import api from "@Utils/api";
import { failure } from "Redux@Helpers";
import useStyles from "./styles";

export default function RoomTypeForm(props) {
  const { roomType, onSuccess, onFail } = props;
  const classes = useStyles();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const { handleSubmit, errors, control, clearErrors } = useForm({
    defaultValues: {
      ...roomType,
    },
  });

  const saveRoomType = (formData) => {
    setLoading(true);
    const obj = {
      ...roomType,
      ...formData,
    };
    if (roomType?.id) {
      api.roomType
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
              msg: "Não foi possível editar o tipo de quarto",
            })
          );
        });
    } else {
      api.roomType
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
              msg: "Não foi possível criar o tipo de quarto",
            })
          );
        });
    }
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        clearErrors();
        handleSubmit(saveRoomType)();
        event.stopPropagation();
      }}
      noValidate
    >
      <Grid container justifyContent="flex-start" spacing={2}>
        <Grid item xs={12}>
          <Controller
            rules={{ required: "Este campo é obrigatório" }}
            as={
              <TextField variant="outlined" label="Tipo" required fullWidth />
            }
            error={!!errors.type}
            helperText={errors.type?.message || false}
            control={control}
            disabled={loading}
            name="type"
            type="text"
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
                label="Capacidade"
                required
                fullWidth
              />
            }
            error={!!errors.capacity}
            helperText={errors.capacity?.message || false}
            control={control}
            disabled={loading}
            name="capacity"
            type="number"
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
                label="Quantidade de camas de casal"
                required
                fullWidth
              />
            }
            error={!!errors.double_bed_quantity}
            helperText={errors.double_bed_quantity?.message || false}
            control={control}
            disabled={loading}
            name="double_bed_quantity"
            type="number"
            defaultValue={0}
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
                label="Quantidade de camas de solteiro"
                required
                fullWidth
              />
            }
            error={!!errors.single_bed_quantity}
            helperText={errors.single_bed_quantity?.message || false}
            control={control}
            disabled={loading}
            name="single_bed_quantity"
            type="number"
            defaultValue={0}
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
                label="Quantidade de banheiros"
                required
                fullWidth
              />
            }
            error={!!errors.bathroom_quantity}
            helperText={errors.bathroom_quantity?.message || false}
            control={control}
            disabled={loading}
            name="bathroom_quantity"
            type="number"
            defaultValue={0}
          />
        </Grid>

        <Grid item xs={12}>
          <FormControl error={!!errors?.air_conditioning}>
            <Controller
              name="air_conditioning"
              control={control}
              defaultValue={false}
              render={(p) => (
                <FormControlLabel
                  {...p}
                  key="air_conditioning"
                  label="Ar Condicionado"
                  control={
                    <Checkbox
                      onChange={(e) => {
                        p.onChange(e.target.checked);
                      }}
                      checked={p.value}
                    />
                  }
                />
              )}
            />
            <FormHelperText>{errors?.air_conditioning?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl error={!!errors?.fridge}>
            <Controller
              name="fridge"
              control={control}
              defaultValue={false}
              render={(p) => (
                <FormControlLabel
                  {...p}
                  key="fridge"
                  label="Frigobar"
                  control={
                    <Checkbox
                      onChange={(e) => {
                        p.onChange(e.target.checked);
                      }}
                      checked={p.value}
                    />
                  }
                />
              )}
            />
            <FormHelperText>{errors?.fridge?.message}</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControl error={!!errors?.balcony}>
            <Controller
              name="balcony"
              control={control}
              defaultValue={false}
              render={(p) => (
                <FormControlLabel
                  {...p}
                  key="balcony"
                  label="Sacada"
                  control={
                    <Checkbox
                      onChange={(e) => {
                        p.onChange(e.target.checked);
                      }}
                      checked={p.value}
                    />
                  }
                />
              )}
            />
            <FormHelperText>{errors?.balcony?.message}</FormHelperText>
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

RoomTypeForm.propTypes = {
  roomType: PropTypes.object,
  onSuccess: PropTypes.func,
  onFail: PropTypes.func,
};

RoomTypeForm.defaultProps = {
  roomType: {},
  onSuccess: () => {},
  onFail: () => {},
};
