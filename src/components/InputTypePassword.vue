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
               type="password"
               autocomplete="nope"
               spellcheck="false"
               maxlength="15"
               data-password
               @copy.prevent
               @cut.prevent
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
                default: 'Password'
            },

            placeholder: {
                type: String,
                default: '••••••'
            },

            complexity: {
                type: Boolean,
                default: false
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

            initialInvalidMessage: {
                type: String,
                default: 'Enter your password'
            }
        },

        data: () => ({
            id: generateRandomId(),

            minLength: 5,

            invalidMessage: 'Enter your password',

            isBlurred: false,
            isDirty: false,
            isValid: false
        }),

        methods: {
            updateValue (newValue) {
                if (newValue !== ' ') {
                    this.isDirty = true
                }

                let clearedValue = newValue.replace(/[\sА-Яа-яёЁ№]/g, '').slice(0, 15)

                if (this.complexity) {
                    this.isValid = this.isPasswordComplexity(clearedValue)
                } else {
                    this.isValid = clearedValue.length >= this.minLength
                    this.invalidMessage = clearedValue.length ? `Password must be at least ${this.minLength} characters` : this.initialInvalidMessage
                }

                this.$emit('input', this.isValid ? clearedValue : null)
            },

            blurField () {
                this.isBlurred = this.isDirty
            },

            isPasswordComplexity (password) {
                let variations = {
                    digits: /\d/.test(password),
                    words: /[A-Za-z]/.test(password),
                    length: new RegExp(`.{${this.minLength},}`).test(password)
                }

                if (!variations.digits) {
                    this.invalidMessage = 'Password must contain at least 1 digit'

                    return false
                }

                if (!variations.words) {
                    this.invalidMessage = 'Password must contain at least 1 letter'

                    return false
                }

                if (!variations.length) {
                    this.invalidMessage = `Password must be at least ${this.minLength} characters`

                    return false
                }

                return true
            },

            reset () {
                this.$refs.input.value = ''
                Object.assign(this.$data, this.$options.data.apply(this))
            }
        }
    }
</script>
