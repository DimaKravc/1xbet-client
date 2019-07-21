<template>
    <fieldset class="form-group">
        <label :for="id"
               class="form-group__label">{{ label }}</label>
        <input ref="input"
               :name="id"
               :id="id"
               :disabled="disabled"
               :readonly="readonly"
               :class="['form-group__input', {'form-group__input_state_invalid': (isDirty || validation) && !isValid}]"
               :placeholder="placeholder"
               type="text"
               autocomplete="nope"
               spellcheck="false"
               @input="updateValue($event.target.value)"
               @blur="blurField()">
        <transition name="fade">
            <small v-if="(isBlurred || validation) && !isValid"
                   class="form-group__invalid-message">
                {{ invalidMessage }}
            </small>
        </transition>

    </fieldset>
</template>

<script>
    import { generateRandomId } from 'utils/misc'

    export default {
        props: {
            label: {
                type: String,
                default: 'Email address'
            },

            placeholder: {
                type: String,
                default: ''
            },

            validation: {
                type: Boolean,
                default: false
            },

            disabled: {
                type: Boolean,
                default: false
            },

            readonly: {
                type: Boolean,
                default: false
            },

            invalidMessage: {
                type: String,
                default: ''
            }
        },

        data: () => ({
            id: generateRandomId(),

            isBlurred: false,
            isDirty: false,
            isValid: false
        }),

        methods: {
            updateValue (newValue) {
                if (newValue !== ' ') {
                    this.isDirty = true
                }

                this.isValid = newValue.length

                this.$emit('input', this.isValid ? newValue : null)
            },

            blurField () {
                this.isBlurred = this.isDirty
            },

            reset () {
                this.$refs.input.value = ''
                Object.assign(this.$data, this.$options.data.apply(this))
            }
        }
    }
</script>
