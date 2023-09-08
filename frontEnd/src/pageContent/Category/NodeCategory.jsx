import { Component } from "react";

class NodeCategory extends Component {
    constructor(value, category) {
        this.value = value;
    }

    getParent() {
        const parent = (() => {
            if ("childCategory" in this.value) {
                return null;
            } else if ("childCategory" in this.value) {
                return (
                    category.find(({ childCategory }) =>
                        childCategory.some(({ idCategory }) => idCategory === this.value.id)
                    ) || null
                );
            } else {
                for (const { states } of sampleData) {
                    const state = states.find(({ cities }) =>
                        cities.some(({ id }) => id === this.value.id)
                    );
                    if (state) {
                        return state;
                    }
                }
                return null;
            }
        })();
        return parent ? new Node(parent) : parent;
    }
}

export default NodeCategory;
