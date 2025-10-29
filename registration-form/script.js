const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// 表单提交事件
form.addEventListener("submit", function (e) {
    e.preventDefault();
    
    // 0. 检查所有输入是否有值
    const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
    let isFormValid = isRequiredValid;
    
    // 如果必填字段都填了，再进行其他验证
    if (isRequiredValid) {
        // 1. 检查用户名长度 (3-15字符)
        const isUsernameValid = checkLength(username, 3, 15);
        // 2. 检查邮箱格式
        const isEmailValid = checkEmail(email);
        // 3. 检查密码长度 (6-25字符)
        const isPasswordValid = checkLength(password, 6, 25);
        // 4. 检查密码是否匹配
        const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

        isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
    }

    // 如果所有验证都通过
    if (isFormValid) {
        alert("注册成功！");
        form.reset();
        // 重置所有输入框样式
        document.querySelectorAll(".form-item").forEach((group) => {
            group.className = "form-item";
        });
    }
});

// 实时验证 - 在用户输入时提供即时反馈
username.addEventListener("input", function() {
    if (this.value.trim() !== "") {
        checkLength(this, 3, 15);
    }
});

email.addEventListener("input", function() {
    if (this.value.trim() !== "") {
        checkEmail(this);
    }
});

password.addEventListener("input", function() {
    if (this.value.trim() !== "") {
        checkLength(this, 6, 25);
        // 如果确认密码有值，也检查匹配
        if (confirmPassword.value.trim() !== "") {
            checkPasswordsMatch(password, confirmPassword);
        }
    }
});

confirmPassword.addEventListener("input", function() {
    if (this.value.trim() !== "" && password.value.trim() !== "") {
        checkPasswordsMatch(password, this);
    }
});

// 0. 检查必填字段
function checkRequired(inputArray) {
    let isValid = true;

    inputArray.forEach((input) => {
        if (input.value.trim() === "") {
            let fieldName = formatFieldName(input);
            let message = "";
            
            switch(input.id) {
                case 'username':
                    message = "用户名不能为空";
                    break;
                case 'email':
                    message = "邮箱地址不能为空";
                    break;
                case 'password':
                    message = "密码不能为空";
                    break;
                case 'confirmPassword':
                    message = "请确认密码";
                    break;
                default:
                    message = `${fieldName} 是必填项`;
            }
            
            showError(input, message);
            isValid = false;
        } else {
            showSuccess(input);
        }
    });
    return isValid;
}

// 1 & 3. 检查输入长度
function checkLength(input, min, max) {
    const value = input.value.trim();
    
    if (value === "") {
        return false;
    }
    
    if (value.length < min) {
        let message = "";
        if (input.id === 'username') {
            message = `用户名至少需要 ${min} 个字符`;
        } else if (input.id === 'password') {
            message = `密码至少需要 ${min} 个字符`;
        } else {
            message = `${formatFieldName(input)} 至少需要 ${min} 个字符`;
        }
        showError(input, message);
        return false;
    } else if (value.length > max) {
        let message = "";
        if (input.id === 'username') {
            message = `用户名不能超过 ${max} 个字符`;
        } else if (input.id === 'password') {
            message = `密码不能超过 ${max} 个字符`;
        } else {
            message = `${formatFieldName(input)} 不能超过 ${max} 个字符`;
        }
        showError(input, message);
        return false;
    } else {
        showSuccess(input);
        return true;
    }
}

// 2. 检查邮箱格式
function checkEmail(email) {
    const value = email.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (value === "") {
        return false;
    }
    
    if (emailRegex.test(value)) {
        showSuccess(email);
        return true;
    } else {
        showError(email, "请输入有效的邮箱地址（例如：user@example.com）");
        return false;
    }
}

// 4. 检查密码是否匹配
function checkPasswordsMatch(input1, input2) {
    const value1 = input1.value.trim();
    const value2 = input2.value.trim();
    
    if (value1 === "" || value2 === "") {
        return false;
    }
    
    if (value1 !== value2) {
        showError(input2, "密码与确认密码不一致，请重新输入");
        return false;
    } else {
        showSuccess(input2);
        return true;
    }
}

// 格式化字段名称（用于错误消息）
function formatFieldName(input) {
    const names = {
        'username': '用户名',
        'email': '邮箱地址',
        'password': '密码',
        'confirmPassword': '确认密码'
    };
    return names[input.id] || input.id;
}

// 显示错误信息（红色提示）
function showError(input, message) {
    const formGroup = input.parentElement;
    formGroup.className = "form-item error";
    const small = formGroup.querySelector("small");
    small.innerText = message;
}

// 显示成功状态（清除错误信息）
function showSuccess(input) {
    const formGroup = input.parentElement;
    formGroup.className = "form-item success";
    const small = formGroup.querySelector("small");
    small.innerText = "";
}

// 输入框获得焦点时清除错误状态
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        const formGroup = this.parentElement;
        if (formGroup.classList.contains('error')) {
            const small = formGroup.querySelector("small");
            small.innerText = "";
            formGroup.className = "form-item";
        }
    });
});