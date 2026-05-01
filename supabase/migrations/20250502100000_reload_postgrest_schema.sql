-- Si tu avais déjà créé delete_own_account avant l’ajout du NOTIFY dans la migration initiale,
-- exécuter ce fichier (ou seulement la ligne ci‑dessous) une fois dans le SQL Editor.
notify pgrst, 'reload schema';
