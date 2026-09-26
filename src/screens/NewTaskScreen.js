import { useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, Text } from "react-native";

export default function NewTaskScreen({ navigation, onAddTask }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [priority, setPriority] = useState('Media');

    const [error, setError] = useState('');
    const [photoUri, setPhotoUri] = (null);
    const [cameraOpen, setCameraOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const savingRef = useRef(false);

    // Função de salvar

    async function handleSave() {
        if (
            !title.trim()
            || !description.trim()
            || !category.trim()
        ) {
            setError('Preencher titulo, descrição e categoria');
            return;
        }

        //Criação do Objeto
        const newTask = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            title: title.trim(),
            description: description.trim(),
            category: category.trim(),
            priority,

            done: false,
            photoUri: null,
            notificationId: null,
            reminderAt: null,
        }

        //Envio da nova tarefa

        savingRef.current = true;
        setSaving(true);
        let savedPhoto;
        try {
            savedPhoto = keepTaskPhoto(photoUri, newTask.id);
            await onAddTask({ ...newTask, photoUri: savedPhoto });
            navigation.goBack();
        } catch {
            try { discardTaskPhoto(savedPhoto); } catch { }
            setError('Não foi possivel salvar a tarefa. Tente novamente.');
            savingRef.current = false;
            setSaving(false);
        }
    }

    return (

        // KEYBOARD AVOIDING VIEW
        // ajuda a impedir que o nosso teclado cubra os campos do formulario.
        <KeyboardAvoidingView
            style={styles.flex}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >



            {cameraOpen && <CameraCapture
                onClose={() => setCameraOpen(false)}
                onCapture={(uri) => { setPhotoUri(uri); setCameraOpen(false); }} />}

            <ScrollView>

                
            </ScrollView>
        </KeyboardAvoidingView>
    )
}