class AppUtility {
  static appointment_verifyMessage: String =
    "Bu gönderi için randevu talebi oluşturulmamıştır";
  static appointment_request_error_message: String =
    "Girilen Format Doğru Değil";
  static appointment_doctor_user_not_found_message: String =
    "Sistemde kayıtlı danışan yada danışman bulunamadı lütfen tekrar deneyiniz";
  static appointment_is_taking_verify_message: String =
    "Randevu başarıyla oluşturuldu";
  static appointment_not_taken_message: String =
    "Gönderi için randevu oluşturamasınız ";
    static appointment_is_needing_verify_message: String = "Kullanıcının gönderi için randevu alabilmesi onaylandı";
    static appointment_all_free_message: String = "Bütün Randevular müsait durumdadır";
    static register_email_fail:String =  "Email bulunamadı";
    static register_age_fail:String = "Yaşınız 18'den küçüktür";
    static register_username_fail:String = "Kullanıcı ismi geçerli değildir";
    static register_password_fail:String = "Şifre geçerli değildir";
}

export { AppUtility };
