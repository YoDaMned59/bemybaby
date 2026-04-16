export function getTodayTasks(week) {
    if (week == null || isNaN(week) || week < 0) {
      return [
        "Renseigner la date prévue d’accouchement",
        "Commencer à préparer la liste bébé",
        "Noter les premières questions importantes",
      ];
    }
  
    if (week < 12) {
      return [
        "Déclarer la grossesse",
        "Prévenir la CAF et la CPAM",
        "Prendre les premiers rendez-vous importants",
      ];
    }
  
    if (week < 20) {
      return [
        "Commencer la liste bébé",
        "Réfléchir au mode de garde",
        "Préparer les achats essentiels",
      ];
    }
  
    if (week < 28) {
      return [
        "Choisir ou finaliser la maternité",
        "Vérifier le siège auto",
        "Préparer progressivement la chambre de bébé",
      ];
    }
  
    if (week < 34) {
      return [
        "Préparer la valise maternité",
        "Vérifier les documents importants",
        "Finaliser les achats bébé",
      ];
    }
  
    return [
      "Finaliser la valise maternité",
      "Préparer les papiers pour la naissance",
      "Vérifier que tout l’essentiel est prêt à la maison",
    ];
  }