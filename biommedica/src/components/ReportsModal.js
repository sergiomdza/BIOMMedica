import { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import Modal from './Modal';
import { TextField } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import styles from '@/styles/Home.module.css'
import dayjs from 'dayjs';

export default function ReportsModal({ openVar: { open, save }, handleClose, selectedData, onEdit, onAdd }) {

    const [localData, setlocalData] = useState(selectedData);
    const [localMachines, setLocalMachines] = useState([]);

    const getMachines = async () => {
        const res = await fetch(`api/machines`);
        const machines = await res.json();
        console.log('Machines:', machines)
        setLocalMachines(machines)
    }

    const onChange = (field, value) => {
        console.log('Cambio:', field, value)
        if (field == "machine") {
            setlocalData((localData) => ({ ...localData, [field]: JSON.parse(value)}))
        } else {
            setlocalData((localData) => ({ ...localData, [field]: value.toString() }))
        }
    }

    useEffect(() => {
        setlocalData(selectedData)
    }, [selectedData])

    useEffect(() => {
        getMachines()
    }, [])

    useEffect(() => {
        console.log('Local Data,', localData)
    }, [localData])


    const onSaveChanges = () => {
        if (save) {
            onAdd(localData)
        } else {
            onEdit(localData)
        }
    }

    const handleInternalClose = () => {
        setlocalData(null)
        handleClose()
    }


    return (
        <Modal open={open} handleClose={() => handleInternalClose()} onSave={() => onSaveChanges()}>
            <Typography id="modal-modal-title" variant="h6" component="h2" className={styles.input}>
                ID: {localData?._id || "No ID"}
            </Typography>
            <TextField
                className={styles.input}
                id="outlined-basic"
                label="Nombre"
                variant="outlined"
                onChange={(event) => onChange('name', event.target.value)}
                value={localData?.name || " "}
            />
            <TextField
                className={styles.input}
                id="outlined-basic"
                label="Zona"
                variant="outlined"
                onChange={(event) => onChange('zone', event.target.value)}
                value={localData?.zone || " "}
            />
            <TextField
                className={styles.input}
                id="outlined-basic"
                label="Insumos Consumidos"
                variant="outlined"
                onChange={(event) => onChange('consumed', event.target.value)}
                value={localData?.consumed || " "}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    className={styles.DatePicker}
                    label="Fecha Inicio"
                    value={dayjs(localData?.startDate) || "null"}
                    onChange={(newValue) => onChange('startDate', newValue)}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                    className={styles.DatePicker}
                    label="Fecha Fin"
                    value={dayjs(localData?.endDate) || "null"}
                    onChange={(newValue) => onChange('endDate', newValue)}
                />
            </LocalizationProvider>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={JSON.stringify(localData?.machine) || 0}
                defaultValue={0}
                label="Máquina"
                onChange={(event) => onChange('machine', event.target.value)}
                className={styles.selectInput}
            >
                <MenuItem value={0}>None</MenuItem>
                {
                    localMachines.map((machine) => (
                        <MenuItem key={machine._id} value={JSON.stringify(machine)}>{`${machine.name} - ${machine.serial_number}`}</MenuItem>
                    ))
                }
            </Select>
        </Modal>
    );
}