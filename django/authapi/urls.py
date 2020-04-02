from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from .views import AddUser
from . import views
urlpatterns = [
  path('create/', AddUser.as_view(), name="create-user-as-admin"),
  path('login/', obtain_jwt_token),
  path('refresh-token/', refresh_jwt_token),
  path('currentuser/',views.LoggedInUserDetail.as_view(), name="loggedin-user"),
  path('user/<int:user_id>', views.UserDetail.as_view(), name="user"),
]