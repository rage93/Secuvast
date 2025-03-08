class SchemaTenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Aquí puedes manejar la lógica de selección de esquema
        return self.get_response(request)
