// 联系表单处理脚本
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // 表单提交事件
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 验证表单
            if (validateForm()) {
                // 模拟表单提交
                showSubmitMessage(true);
                
                // 在实际应用中，这里会有AJAX请求发送表单数据到服务器
                // 这里只是模拟一个成功的提交
                setTimeout(() => {
                    contactForm.reset();
                }, 2000);
            }
        });
        
        // 为所有必填字段添加验证
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            field.addEventListener('blur', function() {
                validateField(field);
            });
            
            field.addEventListener('input', function() {
                // 如果用户开始输入，移除错误提示
                if (field.classList.contains('error')) {
                    field.classList.remove('error');
                    const errorMessage = field.parentElement.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                }
            });
        });
    }
    
    // 表单验证函数
    function validateForm() {
        let isValid = true;
        
        // 验证所有必填字段
        const requiredFields = contactForm.querySelectorAll('[required]');
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    // 单个字段验证函数
    function validateField(field) {
        let isValid = true;
        
        // 移除旧的错误消息
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // 检查字段是否为空
        if (!field.value.trim()) {
            showError(field, '此项为必填项');
            isValid = false;
        } 
        // 验证电子邮件格式
        else if (field.type === 'email' && !isValidEmail(field.value)) {
            showError(field, '请输入有效的电子邮件地址');
            isValid = false;
        }
        // 验证复选框是否被选中
        else if (field.type === 'checkbox' && !field.checked) {
            showError(field, '请接受隐私政策');
            isValid = false;
        }
        
        return isValid;
    }
    
    // 显示错误消息
    function showError(field, message) {
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // 对于复选框，将错误添加到父元素
        if (field.type === 'checkbox') {
            field.parentElement.appendChild(errorDiv);
        } else {
            field.parentElement.appendChild(errorDiv);
        }
    }
    
    // 显示提交消息
    function showSubmitMessage(success) {
        // 移除旧的消息
        const oldMessage = document.querySelector('.form-message');
        if (oldMessage) {
            oldMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = 'form-message ' + (success ? 'success' : 'error');
        
        if (success) {
            messageDiv.textContent = '您的消息已成功发送！我们将尽快回复您。';
        } else {
            messageDiv.textContent = '发送失败，请稍后再试。';
        }
        
        // 将消息添加到表单的开头
        contactForm.prepend(messageDiv);
        
        // 5秒后自动移除消息
        setTimeout(() => {
            messageDiv.remove();
        }, 5000);
    }
    
    // 验证电子邮件格式
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
}); 