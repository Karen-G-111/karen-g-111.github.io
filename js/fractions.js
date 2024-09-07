class Fraction {
    #numerator = 0;
    #denominator = 1;

    /**
     * create a fraction
     * @param {number} numerator -  can't be number with ','
     * @param {number} denominator - can't be equal 0 or number with ','
     */
    constructor(numerator = 0, denominator = 1) {

        numerator = Number(numerator);
        denominator = Number(denominator);

        if (!denominator || !Number.isFinite(numerator)) {
            this.#numerator = NaN;
            this.#denominator = NaN;
        }
        else {
            this.#numerator = Math.floor(numerator);
            this.#denominator = Math.floor(denominator);
            this.#curtail();
        }

    }

    setNumer(num) {
        this.#numerator = Number(num);
        this.#curtail();
    }

    setDenom(denom) {
        if (!denom)
            this.#denominator = NaN;
        else
            this.#denominator = Number(denom);
        this.#curtail();
    }

    getNumer() {
        return this.#numerator;
    }

    getDenom() {
        return this.#denominator;
    }

    /**
     * it curtail the fraction
     */
    #curtail() {
        if (!isFinite(this.#numerator) || !isFinite(this.#denominator)) return;

        let [big, small] = [this.#numerator, this.#denominator];
        if (big < small) {
            [big, small] = [small, big];
        }

        let r;
        do {
            r = big % small;
            if (!r) break;
            [big, small] = [small, r];
        } while (true);

        this.#numerator /= small;
        this.#denominator /= small;
    }

    [Symbol.toPrimitive] = function (hint) {
        return hint === 'string' ? `(${this.#numerator}/${this.#denominator})` : this.#numerator / this.#denominator;
    }
}
