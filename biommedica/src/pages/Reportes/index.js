// "use client";
import { useState, useEffect } from 'react';

//Custom Components
import Table from '../../components/TableEdited';
import ReportsModal from '../../components/ReportsModal';

//Material UI
import Typography from '@mui/material/Typography';
import styles from '@/styles/Home.module.css';
import Button from '@mui/material/Button';

export default function Reportes({ reports, totalreports }) {

    const [open, setOpen] = useState({ open: false, save: false });
    const [selected, setSelected] = useState(null);

    const [localreports, setLocalreports] = useState(reports);
    const [localTotalreports, setLocalTotalreports] = useState(totalreports)

    const [selectedData, setSelectedData] = useState(null);

    const getSelectedData = async (selected) => {
        try {
            const res = await fetch(`api/reports/${selected}`);
            const report = await res.json();
            setSelectedData(report)

        } catch (e) {
            console.error(e);
            setSelectedData(null)
        }
    };

    const deleteData = async (editedID) => {
        const res = await fetch(`api/reports/${editedID}`, { method: "DELETE" });
        const report = await res.json();
        setSelected(null)
        updateData()
    }

    const onEdit = async (newData) => {
        try {
            const res = await fetch(`api/reports/${selected}`, { method: "PUT", body: JSON.stringify(newData) });
            const report = await res.json();
            setSelected(null)
            updateData()
        } catch (e) {
            console.error(e);
        }
    }

    const saveNewData = async (newData) => {
        try {
            const res = await fetch(`api/reports`, { method: "POST", body: JSON.stringify(newData) });
            const report = await res.json();
            setSelected(null)
            updateData()
        } catch (e) {
            console.error(e);
        }
    }

    const updateData = async () => {
        const res = await fetch(`api/reports`);
        const reports = await res.json();

        setLocalreports(reports)

        const totalRes = await fetch(`api/reports`, { method: "PUT" });
        const totalreports = await totalRes.json();
        setLocalTotalreports(totalreports)
    }

    useEffect(() => {
        console.log('Edited:', selected)
        if (selected) {
            getSelectedData(selected);
        };
    }, [selected]);


    const openModal = (editedID) => {
        setOpen({ open: true, saved: false });
        setSelected(editedID)
    };

    return (
        <div className={styles.mainInventory}>
            <ReportsModal
                openVar={open}
                handleClose={() => setOpen({ open: false, save: false })}
                selectedData={selectedData}
                onEdit={(newData) => onEdit(newData)}
                onAdd={(newData) => saveNewData(newData)}
            />
            <Typography gutterBottom variant="h5" component="div" className={styles.text}>
                INVENTARIO
            </Typography>
            <div className={styles.button_container}>
                <Button
                    onClick={() => setOpen({ open: true, save: true })}
                    variant="contained">
                    Add new
                </Button>
            </div>
            <Table
                rowHeaders={rowHeaders}
                rows={localreports}
                totalRows={localTotalreports.count}
                onEdit={(editedID) => openModal(editedID)}
                onDelete={(editedID) => deleteData(editedID)}
            />
        </div>
    )
}

const rowHeaders = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'Nombre reporte',
    }
]

export async function getServerSideProps() {
    try {
        const res = await fetch(`${process.env.BACK_HOST}/reports`);
        const reports = await res.json();

        const totalRes = await fetch(`${process.env.BACK_HOST}/reports`, { method: "PUT" });
        const totalreports = await totalRes.json();

        return {
            props: {
                reports,
                totalreports: totalreports || 0
            }
        }
    } catch (e) {
        console.error(e);
        return {
            props: {
                reports: [],
                totalreports: 0,
            }
        }
    }
}