class Cart {
    constructor(formations=[]) {
        this.formations = formations;
        console.log(this.formations);
    }

    get formationsList() {
        return this.formations;
    }

    /*
        Check if the formation is already on the formationSubscribed list
        @return True if already on the list, False otherwise
    */
    checkFormationSubscribed(formation) {
        let isSubscibed = false;
        console.log(this.formations);
        this.formations.forEach(element => {
            if (element.idformation == formation.idformation)
                isSubscibed = true;
        });

        return isSubscibed;
    }

    addFormation(formation) {
        if (this.checkFormationSubscribed(formation) == false)
            this.formations.push(formation);
    }

    removeFormation(formation) {
        if (this.checkFormationSubscribed(formation) == true) {
            for (let i in this.formations) {
                if (this.formations[i].idformation == formation.idformation)
                    this.formations.splice(i, 1);
            }
        }
    }
}

module.exports = Cart