import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { Input } from "../../../../components/ui/input";
import { CustomButton } from "../../../../components/ui/custom-button";
import { Card, CardContent } from "../../../../components/ui/card";
import { useRegister } from "../../../../hooks/auth/use-register";
import { toast } from "sonner";
import { FormError } from "../../../../components/ui/error-mesage";



interface RegisterFormInputs {
  name: string;
  email: string;
  password: string;
}

export const RegisterPage = () => {
  const { mutate: registerUser, isPending, isError } = useRegister();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormInputs>();

  const onSubmit = (data: RegisterFormInputs) => {
    registerUser(data, {
      onSuccess: () => {

        toast.success("Usuario registrado con exito")
        navigate("/auth/login")
      }
    })
  };

  return (
    <div className=" flex items-start justify-center ">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl rounded-2xl">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-3xl font-semibold text-center">Crear Cuenta</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

              {/* Nombre */}
              <div className="space-y-2">
                <label>Nombre</label>
                <Input
                  type="text"
                  placeholder="Juan Pérez"
                  {...register("name", { required: "El nombre es obligatorio" })}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label>Email</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email inválido"
                    }
                  })}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label>Contraseña</label>
                <Input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "Debe tener al menos 6 caracteres"
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password.message}</p>
                )}
              </div>

              <CustomButton
                label={"Registrarme"}
                loading={isPending}
                type="submit"
                className="w-full"

              />

            </form>



            {isError && (
              <FormError message="Usuario registrado anteriormente"></FormError>
            )}

            <p className="text-center text-sm text-gray-500">
              ¿Ya tenés cuenta?
              <Link to="/auth/login" className="text-blue-600 ml-1 hover:underline">
                Iniciar sesión
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
