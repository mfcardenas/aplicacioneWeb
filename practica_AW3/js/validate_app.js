/**
 * Created by mcardenas on 1/04/17.
 */

// Expresión para validar email
expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

/**
 * Validar el formulario de registro de usuario.
 */
function validaRegistro(form) {
    // Comprobar los campos del formulario de registro
    if (form.name.value == '' || form.email.value == '' || form.username.value == '' || form.password.value == '' || form.confirm.value == '') {
        alert('Debe proporcionar todos los campos solicitados. Por favor, inténtelo de nuevo.');
        return false;
    }

    if (form.password.value != "" && form.confirm.value != "") {

        // Validar el tamaño de la contraseña
        if (form.password.value.length < 8) {
            alert('La contraseña debe tener al menos 8 caracteres. Por favor, inténtelo de nuevo.');
            form.password.focus();
            return false;
        }

        // Validar composición de la contraseña
        var re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
        if (!re.test(form.password.value)) {
            alert('La contraseña debe contener al menos un número, una letra minúscula y una mayúscula. Por favor, inténtelo de nuevo.');
            return false;
        }

        // Validar contraseña y confirmación de la contraseña
        if (form.password.value != form.confirm.value) {
            alert('Su contraseña y la confirmación de la contraseña no coinciden. Por favor, inténtelo de nuevo.');
            form.password.focus();
            return false;
        }

        // Crear un campo nuevo, este será un hash de la contraseña.
        var p = document.createElement("input");

        // Enviar un nuevo campo oculto con la clave encriptada.
        form.appendChild(p);
        p.name = "pass";
        p.id = "pass";
        p.type = "hidden";
        p.value = hex_sha512(password.value);

        // Limpiar los campos contraseña y confirmación de la pagina de registro.
        form.password.value = "";
        form.confirm.value = "";
    }

    // Validar el campo usuario
    re = /^\w+$/;
    if(!re.test(form.username.value)) {
        alert("El nombre de usuario debe contener solo letras, números y subrayados. Por favor, inténtelo de nuevo.");
        form.username.focus();
        return false;
    }

    // Si todo ha ido bien, enviar el formulario.
    form.submit();

}
