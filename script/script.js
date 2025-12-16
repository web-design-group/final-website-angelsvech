document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = this.querySelector('input[type="text"]').value.trim();
    const phone = this.querySelector('input[type="tel"]').value.trim();
    const service = this.querySelectorAll('.form-select')[0].value;
    const date = this.querySelector('input[type="date"]').value;
    const time = this.querySelectorAll('.form-select')[1].value;
    
    if (!name || !phone || !service || !date || !time) {
        alert('Пожалуйста, заполните все обязательные поля!');
        return;
    }
    
    const phoneRegex = /^(\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}$/;
    if (!phoneRegex.test(phone.replace(/\s+/g, ''))) {
        alert('Пожалуйста, введите корректный номер телефона!');
        return;
    }
    
    showPaymentModal();
});

function showPaymentModal() {
    const modalHTML = `
        <div class="payment-modal-overlay" id="paymentModal">
            <div class="payment-modal">
                <div class="payment-modal-header">
                    <h3>Способы оплаты</h3>
                    <button class="payment-modal-close">&times;</button>
                </div>
                <div class="payment-modal-body">
                    <div class="payment-options">
                        <div class="payment-option">
                            <input type="radio" id="sbp" name="payment" value="sbp" checked>
                            <label for="sbp" class="payment-label">
                                <span class="payment-icon">🏦</span>
                                <span class="payment-text">СБП (СБП)</span>
                            </label>
                        </div>
                        <div class="payment-option">
                            <input type="radio" id="googlepay" name="payment" value="googlepay">
                            <label for="googlepay" class="payment-label">
                                <span class="payment-icon">📱</span>
                                <span class="payment-text">Google Pay</span>
                            </label>
                        </div>
                        <div class="payment-option">
                            <input type="radio" id="card" name="payment" value="card">
                            <label for="card" class="payment-label">
                                <span class="payment-icon">💳</span>
                                <span class="payment-text">Картой онлайн</span>
                            </label>
                        </div>
                        <div class="payment-option">
                            <input type="radio" id="cash" name="payment" value="cash">
                            <label for="cash" class="payment-label">
                                <span class="payment-icon">💵</span>
                                <span class="payment-text">Наличными</span>
                            </label>
                        </div>
                    </div>
                    <div class="payment-summary">
                        <p class="payment-amount">Сумма к оплате: <strong>2 500 ₽</strong></p>
                    </div>
                </div>
                <div class="payment-modal-footer">
                    <button class="payment-btn" id="confirmPayment">Оплатить</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    addPaymentModalStyles();
    
    document.querySelector('.payment-modal-close').addEventListener('click', closePaymentModal);
    
    document.querySelector('.payment-modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            closePaymentModal();
        }
    });
    
    document.getElementById('confirmPayment').addEventListener('click', function() {
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        processPayment(selectedPayment);
    });
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closePaymentModal();
        }
    });
}

function processPayment(paymentMethod) {

    const paymentMethods = {
        'sbp': 'СБП',
        'googlepay': 'Google Pay',
        'card': 'Картой онлайн',
        'cash': 'Наличными'
    };
    
    closePaymentModal();
    
    setTimeout(() => {
        showSuccessMessage();
    }, 300);
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    if (modal) {
        modal.remove();
    }
}

function addPaymentModalStyles() {
    const styles = `
        <style>
            .payment-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 9999;
                backdrop-filter: blur(5px);
            }
            
            .payment-modal {
                background: rgba(47, 4, 75, 0.95);
                border-radius: 50px;
                padding: 30px;
                width: 90%;
                max-width: 500px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                position: relative;
                animation: modalFadeIn 0.3s ease;
            }
            
            @keyframes modalFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .payment-modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(241, 185, 212, 0.3);
            }
            
            .payment-modal-header h3 {
                color: #F1B9D4;
                font-family: 'Comfortaa', cursive;
                font-size: 24px;
                font-weight: 700;
                margin: 0;
            }
            
            .payment-modal-close {
                background: none;
                border: none;
                color: #F1B9D4;
                font-size: 32px;
                cursor: pointer;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
                line-height: 1;
            }
            
            .payment-modal-close:hover {
                background: rgba(241, 185, 212, 0.1);
                transform: rotate(90deg);
            }
            
            .payment-options {
                display: flex;
                flex-direction: column;
                gap: 15px;
                margin-bottom: 25px;
            }
            
            .payment-option {
                position: relative;
            }
            
            .payment-option input[type="radio"] {
                display: none;
            }
            
            .payment-label {
                display: flex;
                align-items: center;
                padding: 15px 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 50px;
                cursor: pointer;
                transition: all 0.3s ease;
                border: 2px solid transparent;
            }
            
            .payment-option input[type="radio"]:checked + .payment-label {
                background: rgba(241, 185, 212, 0.2);
                border-color: #F1B9D4;
            }
            
            .payment-label:hover {
                background: rgba(241, 185, 212, 0.15);
            }
            
            .payment-icon {
                font-size: 24px;
                margin-right: 15px;
                width: 40px;
                text-align: center;
            }
            
            .payment-text {
                color: #F1B9D4;
                font-family: 'Comfortaa', cursive;
                font-size: 18px;
                font-weight: 600;
            }
            
            .payment-summary {
                background: rgba(255, 255, 255, 0.05);
                border-radius: 50px;
                padding: 20px;
                text-align: center;
            }
            
            .payment-amount {
                color: #F1B9D4;
                font-family: 'Comfortaa', cursive;
                font-size: 18px;
                margin: 0;
            }
            
            .payment-amount strong {
                color: #F280B7;
                font-size: 22px;
            }
            
            .payment-modal-footer {
                margin-top: 25px;
                text-align: center;
            }
            
            .payment-btn {
                background: #F1B9D4;
                color: #2F044B;
                border: none;
                border-radius: 50px;
                padding: 16px 50px;
                font-size: 18px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.3s ease;
                font-family: 'Comfortaa', cursive;
                text-transform: uppercase;
                letter-spacing: 1px;
                width: 100%;
                max-width: 300px;
            }
            
            .payment-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 20px rgba(242, 128, 183, 0.4);
            }
            
            .payment-btn:active {
                transform: translateY(0);
            }
            
            /* Адаптивность для мобильных */
            
            @media (max-width: 480px) {
                .payment-modal {
                    padding: 15px;
                }
                
                .payment-label {
                    padding: 12px 15px;
                }
                
                .payment-icon {
                    font-size: 20px;
                    margin-right: 10px;
                    width: 30px;
                }
                
                .payment-text {
                    font-size: 14px;
                }
                
                .payment-amount {
                    font-size: 16px;
                }
                
                .payment-btn {
                    padding: 12px 30px;
                    font-size: 15px;
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', styles);
}

function showSuccessMessage() {
    const successHTML = `
        <div class="text-center">
            <h3 style="color: #F1B9D4; margin-bottom: 20px; font-family: 'Comfortaa', cursive; font-weight: 700;">Спасибо за запись и оплату!</h3>
            <p style="color: #F1B9D4; margin-bottom: 30px; font-family: 'Comfortaa', cursive; font-weight: 500;">Мы свяжемся с вами в ближайшее время для подтверждения записи.</p>
            <button onclick="resetForm()" class="submit-btn">Новая запись</button>
        </div>
    `;
    
    document.querySelector('.booking-section').innerHTML = successHTML;
}

function resetForm() {
    location.reload();
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId !== '#') {
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        }
    });
});

const today = new Date().toISOString().split('T')[0];
document.querySelector('input[type="date"]').setAttribute('min', today);

document.querySelector('input[type="tel"]').addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    
    if (value.length === 11) {
        value = '+7' + value.slice(1);
    } else if (value.length === 10) {
        value = '+7' + value;
    }
    
    if (value.length > 12) {
        value = value.slice(0, 12);
    }
    
    if (value.length > 2) {
        value = value.replace(/(\+7)(\d{3})/, '$1 ($2) ');
    }
    if (value.length > 9) {
        value = value.replace(/(\+7 \(\d{3}\) )(\d{3})/, '$1$2-');
    }
    if (value.length > 12) {
        value = value.replace(/(\+7 \(\d{3}\) \d{3}-)(\d{2})/, '$1$2-');
    }
    
    this.value = value;
});