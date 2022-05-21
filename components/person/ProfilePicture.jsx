import React, { useRef, useState } from "react";
import { useMutation } from "@apollo/client";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { Dialog } from "primereact/dialog";
import { update_cv_tb_person } from "../../graphql/mutations";
import { UserHeader } from "../../libs/headers";

export const ProfilePicture = (props) => {
	const fileUploadRef = useRef(null);
	const [confirmDialog, setConfirmDialog] = useState(false);
	function hexToBase64(str) {
		str.slice(0, 2);
		return btoa(
			String.fromCharCode.apply(
				null,
				str
					.replace(/\r|\n/g, "")
					.replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
					.replace(/ +$/, "")
					.split(" ")
			)
		);
	}
	String.prototype.removeCharAt = function (i) {
		let tmp = this.split(""); // convert to an array
		tmp.splice(i, 2); // remove 1 element from the array (adjusting for non-zero-indexed counts)
		return tmp.join(""); // reconstruct the string
	};
	const [profile, setProfile] = useState(
		props?.picture_type && props?.picture ? props?.picture_type + "," + hexToBase64(props.picture.removeCharAt(0)) : null
	);

	const [updatePerfil, resAdd] = useMutation(update_cv_tb_person, UserHeader);

	const myUploader = (event) => {
		if (event.files[0].size <= 2000000) {
			readFileDataAsHEX(event.files[0]).then((data) => {
				updatePerfil({
					variables: { email: props?.email, picture: "\\x" + data.picture, picture_type: data.picture_type },
				})
					.then((data) => {
						props.alerts("success", "¡Bien!", "Imagen cambiada");
						fileUploadRef.current.clear();
					})
					.catch((e) => {
						props.alerts("error", "Algo salio mal!", "Inténtalo más tarde");
						fileUploadRef.current.clear();
					});
			});
		} else {
			props.alerts("error", "Hubo un problema!", "El tamaño máximo de la imagen es de 2MB");
			fileUploadRef.current.clear();
		}
	};

	const base64ToHex = (str) => {
		const raw = atob(str);
		let result = "";
		for (let i = 0; i < raw.length; i++) {
			const hex = raw.charCodeAt(i).toString(16);
			result += hex.length === 2 ? hex : "0" + hex;
		}
		return result.toUpperCase();
	};
	const readFileDataAsHEX = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				setProfile(event.target.result);
				var res = event.target.result.split(",");
				resolve({ picture_type: res[0], picture: base64ToHex(res[1]) });
			};
			reader.onerror = (err) => {
				reject(err);
			};
			reader.readAsDataURL(file);
		});
	};
	const deleteImage = () => {
		updatePerfil({
			variables: { email: props?.email, picture: null, picture_type: null },
		}).then((data) => {
			props.alerts("success", "¡Bien!", "Imagen eliminada");
			fileUploadRef.current.clear();
			setProfile(null);
			setConfirmDialog(false);
		});
	};
	const chooseOptions = {
		icon: "pi pi-images",
		iconOnly: false,
		className: "p-button-rounded p-button-outlined",
	};
	const onHide = () => {
		setConfirmDialog(false);
	};

	const confirmDialogFooter = (
		<>
			<Button label="No" icon="pi pi-times" onClick={onHide} className="p-button-text" />
			<Button label="Si" icon="pi pi-check" onClick={deleteImage} autoFocus />
		</>
	);

	return (
		<>
			<div className="grid">
				<div className="col-12 image-selector-btn">
					<FileUpload
						ref={fileUploadRef}
						mode="basic"
						accept="image/*"
						name="profile"
						// maxFileSize={2000000}
						chooseOptions={chooseOptions}
						chooseLabel="Cambiar Imagen"
						customUpload
						uploadHandler={myUploader}
						multiple={false}
						auto
					/>
					{profile && <Button icon="pi pi-times" className="p-button-rounded p-button-outlined" onClick={() => setConfirmDialog(true)} />}
				</div>
				<div className="col-12 md:col-10 md:col-offset-1">
					<div className="flex align-items-center flex-column image-selector">
						{!profile ? (
							<>
								<i className="pi pi-user mt-3 p-5"></i>
								<span className="my-5">Sin imagen de perfil</span>
							</>
						) : (
							<Image src={profile} alt="Image" imageClassName="image-selected" preview />
						)}
					</div>
				</div>
			</div>
			<Dialog header="Confirmación" visible={confirmDialog} style={{ width: "30vw" }} footer={confirmDialogFooter} onHide={onHide}>
				<span>¿Deseas confirmar la eliminación de tu imagen de perfil?</span>
			</Dialog>
		</>
	);
};
