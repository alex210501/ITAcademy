class Cart {
    constructor() {
        let formations = [];
    }
    /*
        Check if the formation is already on the formationSubscribed list
        @return True if already on the list, False otherwise
    */
    checkFormationSubscibed(formation) {
        let isSubscibed = false;

        formations.forEach(element => {
            if (element.idformation == formation.idformation)
                isSubscibed = true;
        });

        return isSubscibed;
}

    addFormation(formation) {
        if (this.checkFormationSubscibed(formation) == false)
            formations.push(formation);
    }

    removeFormation(formation) {
        if (checkFormationSubscibed(formation) == true) {
            for (let i in formations) {
                if (formations[i].idformation == idFormation)
                    formations.splice(i, 1);
            }
        }
    }
}

module.exports = Cart