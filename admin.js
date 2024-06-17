document.addEventListener("DOMContentLoaded", function () {
        const form = document.querySelector("#loginForm");
        const eField = form.querySelector(".email"),
              eInput = eField.querySelector("input"),
              pField = form.querySelector(".password"),
              pInput = pField.querySelector("input");

        form.onsubmit = async (e) => {
            e.preventDefault();

            checkEmail();
            checkPass();

            if (eField.classList.contains("error")) {
                eField.classList.add("shake");
                setTimeout(() => {
                    eField.classList.remove("shake");
                }, 500);
            }
            if (pField.classList.contains("error")) {
                pField.classList.add("shake");
                setTimeout(() => {
                    pField.classList.remove("shake");
                }, 500);
            }

            eInput.onkeyup = () => { checkEmail(); }
            pInput.onkeyup = () => { checkPass(); }

            function checkEmail() {
                let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
                if (!eInput.value.match(pattern)) {
                    eField.classList.add("error");
                    eField.classList.remove("valid");
                    let errorTxt = eField.querySelector(".error-txt");

                    (eInput.value != "") ? errorTxt.innerText = "Enter a valid email address": errorTxt.innerText = "Email tidak boleh kosong!";
                } else {
                    eField.classList.remove("error");
                    eField.classList.add("valid");
                }
            }

            function checkPass() {
                if (pInput.value == "") {
                    pField.classList.add("error");
                    pField.classList.remove("valid");
                    let errorTxt = pField.querySelector(".error-txt");
                    errorTxt.innerText = "Password tidak boleh kosong!";
                } else {
                    pField.classList.remove("error");
                    pField.classList.add("valid");
                }
            }

            if (!eField.classList.contains("error") && !pField.classList.contains("error")) {
                try {
                    const response = await fetch('http://localhost:5000/loginAdmin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: eInput.value,
                            password: pInput.value
                        })
                    });

                    if (!response.ok) {
                        throw new Error('Login failed');
                    }

                    const data = await response.json();

                    if (data.token) {
                        // Save the token to localStorage or cookies
                        localStorage.setItem('token', data.token);

                        // Redirect to the admin page
                        window.location.href = "admin.html";
                    } else {
                        
                        // Handle email field
                        eField.classList.add("error");
                        eField.classList.remove("valid");
                        let emailErrorTxt = eField.querySelector(".error-txt");
                        emailErrorTxt.innerText = "Invalid email !!!";

                        // Handle password field
                        pField.classList.add("error");
                        pField.classList.remove("valid");
                        let passwordErrorTxt = pField.querySelector(".error-txt");
                        passwordErrorTxt.innerText = "Invalid password!!!";

                    
                    }
                } catch (error) {
                    alert(error.message);
                }
            }
        }
    
    });


    document.addEventListener("DOMContentLoaded", function () {
        // Animasi saat buka website, dia turun dari atas
        var navbar = document.querySelector(".navbar");
        if (navbar) {
            navbar.classList.add("animate-navbar");
    
            // Ambil semua tautan di navbar
            var menuLinks = document.querySelectorAll(".navbar .menu li a");
    
            // Tambahkan event listener untuk setiap tautan menu
            menuLinks.forEach(function (menuLink) {
                menuLink.addEventListener("click", function (event) {
                    // Ambil href tautan
                    var targetId = this.getAttribute("href");
    
                    // Ganti warna latar belakang, warna teks, dan logo
                    switchNavbarStyle(targetId);
    
                    // Pastikan default aksi klik tautan tidak terjadi
                    event.preventDefault();
                });
            });
    
            // Animasi saat discroll ke bawah hilang, saat ke atas muncul
            var lastScrollTop = 0;
            var isNavbarVisible = true;
    
            window.addEventListener("scroll", function () {
                var currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
                // Cek apakah scroll ke bawah
                if (currentScroll > lastScrollTop && currentScroll > 0) {
                    // Sembunyikan navbar saat scroll ke bawah
                    navbar.style.top = "-75px";
                    isNavbarVisible = false;
                } else {
                    // Munculkan navbar saat scroll ke atas
                    navbar.style.top = "0";
                    isNavbarVisible = true;
                }
    
                lastScrollTop = currentScroll;
            });
        }
    
        // Temukan tombol logout berdasarkan id
        var logoutButton = document.getElementById('logoutBtn');
        if (logoutButton) {
            // Tambahkan event listener untuk menangani klik tombol logout
            logoutButton.addEventListener('click', function () {
                // Arahkan pengguna ke halaman login (ganti "halaman-login.html" dengan path yang sesuai)
                window.location.href = "login.html";
            });
        }
    
        // Temukan tombol more berdasarkan kelas
        var moreButtons = document.querySelectorAll('.more-button');
        if (moreButtons) {
            // Tambahkan event listener untuk menampilkan popup saat tombol more diklik
            moreButtons.forEach(function (button) {
                button.addEventListener('click', function (event) {
                    var rect = button.getBoundingClientRect();
                    var popup = document.getElementById('popup');
                    if (popup) {
                        popup.style.display = 'block';
                        popup.style.top = (rect.bottom + window.scrollY) + 'px';
                        popup.style.left = (rect.left + window.scrollX - popup.offsetWidth) + 'px';
                    }
                });
            });
        }
    
        // Tambahkan event listener untuk menutup popup saat mengklik di luar popup atau tombol more
        document.addEventListener('click', function (event) {
            var popup = document.getElementById('popup');
            var moreButtons = document.querySelectorAll('.more-button');
            var isOutsidePopup = true;
    
            // Periksa apakah event target berada di luar popup
            if (popup && popup.style.display === 'block') {
                if (event.target !== popup && !popup.contains(event.target)) {
                    moreButtons.forEach(function (button) {
                        if (event.target === button) {
                            isOutsidePopup = false;
                        }
                    });
    
                    if (isOutsidePopup) {
                        popup.style.display = 'none';
                    }
                }
            }
        });
    
        // Temukan tombol untuk menghapus informasi
        var hapusButton = document.getElementById('hapusBtn');
        if (hapusButton) {
            // Tambahkan event listener untuk menangani penghapusan informasi
            hapusButton.addEventListener('click', function () {
                // Tambahkan logika untuk menghapus informasi di sini
                alert('Informasi dihapus');
                // Sembunyikan popup setelah penghapusan
                var popup = document.getElementById('popup');
                if (popup) {
                    popup.style.display = 'none';
                }
            });
        }

        

    });
    
    document.addEventListener('DOMContentLoaded', function() {
        // Ambil elemen popup riwayat
        var popupRiwayat = document.getElementById('popupDetailRiwayat');
    
        // Ambil tombol yang membuka popup riwayat
        var showPopupBtn = document.getElementById('showAllHistory');
    
        // Ambil tombol untuk menutup popup riwayat
        var closePopupBtn = document.getElementById('closePopupDetail');
    
        // Tambahkan event listener untuk tombol yang membuka popup riwayat
        if (showPopupBtn) {
            showPopupBtn.addEventListener('click', function(event) {
                event.preventDefault();
                popupRiwayat.classList.remove('hidden');
            });
        }
    
        // Tambahkan event listener untuk tombol yang menutup popup riwayat
        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', function(event) {
                event.preventDefault();
                popupRiwayat.classList.add('hidden');
            });
        }
    
        // Tambahkan event listener untuk menutup popup riwayat saat klik di luar area popup
        document.addEventListener('click', function(event) {
            var isClickInsidePopup = popupRiwayat.contains(event.target);
            var isClickOnPopupButton = event.target.closest('#showAllHistory');
    
            // Jika klik dilakukan di luar popup dan bukan pada tombol untuk membuka popup
            if (!isClickInsidePopup && !isClickOnPopupButton) {
                popupRiwayat.classList.add('hidden');
            }
        });
    });
    